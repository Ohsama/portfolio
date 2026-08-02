/* ═══════════════════════════════════════════════════════════════
   OUSSAMA BOUKHALFA PORTFOLIO — INTERACTIVE ARCHITECTURE VISUALIZER
   Real-Time Animated Node Graph & Data-Flow Engine (Phase 3.1)
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const ARCHITECTURES = {
    vsaas: {
      title: "VSaaS Cloud Video Streaming & Archival Pipeline",
      desc: "Sub-2s latency RTSP stream ingested via Python OpenCV bridge into a dual HLS segmenter and thread-safe ring buffer for zero-frame-loss S3 archiving.",
      nodes: [
        { id: "cam", label: "RTSP Camera", sub: "1080p 30fps", x: 60, y: 110, type: "source" },
        { id: "bridge", label: "Python Bridge", sub: "OpenCV / FFmpeg", x: 220, y: 110, type: "proc" },
        { id: "queue", label: "Ring Buffer Queue", sub: "Thread-Safe Memory", x: 380, y: 50, type: "buffer" },
        { id: "hls", label: "HLS Segmenter", sub: "2s Rolling Window", x: 380, y: 170, type: "proc" },
        { id: "s3", label: "MinIO S3 Archive", sub: "60s Chunk Storage", x: 540, y: 50, type: "storage" },
        { id: "client", label: "React / Mobile App", sub: "Live HLS Stream", x: 540, y: 170, type: "client" }
      ],
      edges: [
        { from: "cam", to: "bridge", label: "RTSP Stream" },
        { from: "bridge", to: "queue", label: "Raw Frames" },
        { from: "bridge", to: "hls", label: "H.264 Stream" },
        { from: "queue", to: "s3", label: "Batch Write" },
        { from: "hls", to: "client", label: "m3u8 Playlist" }
      ]
    },
    jibli: {
      title: "Jibli Hyperlocal Delivery & Proximity Engine",
      desc: "Real-time courier tracking and WebSocket order broadcast across 58 wilayas with offline-first SQLite fallback.",
      nodes: [
        { id: "cust", label: "Customer App", sub: "Order Request", x: 60, y: 110, type: "client" },
        { id: "api", label: "FastAPI Gateway", sub: "Async Route Handler", x: 220, y: 110, type: "proc" },
        { id: "db", label: "Supabase Postgres", sub: "RLS & Geo-Index", x: 380, y: 50, type: "storage" },
        { id: "ws", label: "WebSocket Hub", sub: "Proximity Dispatch", x: 380, y: 170, type: "proc" },
        { id: "driver", label: "Courier Driver App", sub: "GPS Telemetry", x: 540, y: 170, type: "client" }
      ],
      edges: [
        { from: "cust", to: "api", label: "HTTPS POST" },
        { from: "api", to: "db", label: "SQL Transaction" },
        { from: "api", to: "ws", label: "Event Dispatch" },
        { from: "ws", to: "driver", label: "WS Push (100ms)" },
        { from: "driver", to: "ws", label: "GPS Stream" }
      ]
    },
    rsmanager: {
      title: "RSManager Multi-Tenant SaaS & Thermal Hardware",
      desc: "Isolated multi-tenant repair shop management system with role-based access control (RBAC) and hardware-level ESC/POS thermal receipt printing.",
      nodes: [
        { id: "ui", label: "Cashier Web UI", sub: "React 18 & Zustand", x: 60, y: 110, type: "client" },
        { id: "auth", label: "JWT Auth Gate", sub: "RBAC 4 Tiers", x: 220, y: 110, type: "proc" },
        { id: "core", label: "SQLAlchemy Core", sub: "Tenant Isolation", x: 380, y: 50, type: "proc" },
        { id: "printer", label: "ESC/POS Bridge", sub: "python-escpos", x: 380, y: 170, type: "proc" },
        { id: "db", label: "PostgreSQL DB", sub: "Tenant Schema", x: 540, y: 50, type: "storage" },
        { id: "receipt", label: "Thermal Receipt", sub: "Hardware Output", x: 540, y: 170, type: "output" }
      ],
      edges: [
        { from: "ui", to: "auth", label: "Bearer Token" },
        { from: "auth", to: "core", label: "Authorized Payload" },
        { from: "core", to: "db", label: "ORM Query" },
        { from: "auth", to: "printer", label: "Print Command" },
        { from: "printer", to: "receipt", label: "USB / LAN Print" }
      ]
    }
  };

  let activeSystemKey = 'vsaas';
  let animationFrameId = null;

  document.addEventListener('DOMContentLoaded', () => {
    initArchitectureVisualizer();
  });

  function initArchitectureVisualizer() {
    const canvasContainer = document.getElementById('arch-canvas-container');
    const tabBtns = document.querySelectorAll('.arch-tab-btn');

    if (!canvasContainer) return;

    // Tab switcher
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetKey = btn.getAttribute('data-arch');
        if (targetKey && ARCHITECTURES[targetKey]) {
          tabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          activeSystemKey = targetKey;
          renderArchitectureGraph(targetKey);
        }
      });
    });

    renderArchitectureGraph(activeSystemKey);
  }

  function renderArchitectureGraph(key) {
    const container = document.getElementById('arch-canvas-container');
    const titleEl = document.getElementById('arch-title');
    const descEl = document.getElementById('arch-desc');

    if (!container || !ARCHITECTURES[key]) return;

    const data = ARCHITECTURES[key];
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;

    // Cancel existing loop
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    // Build SVG
    const svgWidth = 660;
    const svgHeight = 240;

    let svgHtml = `<svg width="100%" height="100%" viewBox="0 0 ${svgWidth} ${svgHeight}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">`;

    // Render Edges
    data.edges.forEach((edge, idx) => {
      const fromNode = data.nodes.find(n => n.id === edge.from);
      const toNode = data.nodes.find(n => n.id === edge.to);

      if (fromNode && toNode) {
        const x1 = fromNode.x + 55;
        const y1 = fromNode.y + 25;
        const x2 = toNode.x + 55;
        const y2 = toNode.y + 25;

        svgHtml += `
          <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="arch-edge-line" id="edge-${key}-${idx}" />
          <circle cx="${x1}" cy="${y1}" r="3.5" class="arch-packet-dot" id="packet-${key}-${idx}" />
        `;
      }
    });

    // Render Nodes
    data.nodes.forEach(node => {
      svgHtml += `
        <g class="arch-node-group" transform="translate(${node.x}, ${node.y})" data-node-id="${node.id}">
          <rect width="110" height="50" rx="8" class="arch-node-rect arch-node-${node.type}" />
          <text x="55" y="21" class="arch-node-title" text-anchor="middle">${node.label}</text>
          <text x="55" y="36" class="arch-node-sub" text-anchor="middle">${node.sub}</text>
        </g>
      `;
    });

    svgHtml += `</svg>`;
    container.innerHTML = svgHtml;

    // Start Packet Flow Animation Loop
    let progress = 0;
    function animatePackets() {
      progress = (progress + 0.008) % 1;

      data.edges.forEach((edge, idx) => {
        const fromNode = data.nodes.find(n => n.id === edge.from);
        const toNode = data.nodes.find(n => n.id === edge.to);
        const packetEl = document.getElementById(`packet-${key}-${idx}`);

        if (fromNode && toNode && packetEl) {
          const x1 = fromNode.x + 55;
          const y1 = fromNode.y + 25;
          const x2 = toNode.x + 55;
          const y2 = toNode.y + 25;

          const cx = x1 + (x2 - x1) * progress;
          const cy = y1 + (y2 - y1) * progress;

          packetEl.setAttribute('cx', cx);
          packetEl.setAttribute('cy', cy);
        }
      });

      animationFrameId = requestAnimationFrame(animatePackets);
    }

    animatePackets();
  }
})();
