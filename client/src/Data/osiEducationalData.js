export const educationalContent = {
  sender: {
    Application: {
      title: "📨 Application Layer (Layer 7)",
      description: "Your message is created in application format.",
      details: "The sending device generates data using applications like web browsers, email clients, or messaging apps. This is the user's actual data that needs to be transmitted.",
      transformation: (message) => `Original message: "${message}" is now ready for network transmission.`,
      technical: "HTTP, FTP, SMTP, DNS, Telnet, DHCP"
    },
    Presentation: {
      title: "🔐 Presentation Layer (Layer 6)",
      description: "Data translation, encryption, and compression.",
      details: "Converts application data into network format, encrypts for security, and compresses for efficiency. This ensures the receiving device can understand the data regardless of its native format.",
      transformation: "Data is encrypted and translated into a universal format (like ASCII or EBCDIC) that the network can understand.",
      technical: "SSL/TLS, JPEG, GIF, MPEG, ASCII, EBCDIC"
    },
    Session: {
      title: "🤝 Session Layer (Layer 5)",
      description: "Manages communication sessions between applications.",
      details: "Establishes, maintains, and terminates connections between applications on different devices. Adds checkpoints to allow recovery from interruptions.",
      transformation: "A secure session is established with the receiver, including authentication, checkpoints, and session IDs.",
      technical: "NetBIOS, RPC, PPTP, SMB, NFS, SQL"
    },
    Transport: {
      title: "🚚 Transport Layer (Layer 4)",
      description: "End-to-end communication and reliability.",
      details: "Breaks data into segments, provides error checking, ensures reliable delivery, and manages flow control to prevent overwhelming the receiver.",
      transformation: "Data is split into segments with sequence numbers, port numbers, and checksums added for error detection.",
      technical: "TCP (reliable), UDP (fast), SCTP, DCCP"
    },
    Network: {
      title: "🌐 Network Layer (Layer 3)",
      description: "Routing and logical addressing.",
      details: "Adds source and destination IP addresses, determines the best path through the network, and handles packet fragmentation.",
      transformation: "Segments become packets/datagrams with IP headers containing routing information and TTL (Time to Live).",
      technical: "IPv4, IPv6, ICMP, ARP, RIP, OSPF, BGP"
    },
    "Data Link": {
      title: "🔗 Data Link Layer (Layer 2)",
      description: "Physical addressing and error detection.",
      details: "Adds MAC addresses, performs error checking with CRC, and controls access to the physical medium through protocols like CSMA/CD.",
      transformation: "Packets become frames with MAC addresses, frame check sequence (CRC), and control information.",
      technical: "Ethernet, Wi-Fi (802.11), PPP, MAC addresses, ARP"
    },
    Physical: {
      title: "⚡ Physical Layer (Layer 1)",
      description: "Raw bitstream transmission.",
      details: "Converts frames into electrical/optical/radio signals for physical transmission. Defines voltage levels, timing, and physical connectors.",
      transformation: "Frames are converted to bits (1s and 0s) and transmitted as electrical signals, light pulses, or radio waves.",
      technical: "Cables (UTP, Coaxial, Fiber), Hubs, Repeaters, Modems, Radio waves"
    }
  },
  receiver: {
    Physical: {
      title: "⚡ Physical Layer (Layer 1) - Receiving",
      description: "Receiving raw bitstream from the medium.",
      details: "Receives electrical/optical/radio signals and converts them back into bits. Detects signal levels and timing to reconstruct the digital signal.",
      transformation: "Signals received from the network medium are interpreted and converted back into binary data (bits).",
      technical: "Signal decoding, Bit recovery, Medium interface, Clock synchronization"
    },
    "Data Link": {
      title: "🔗 Data Link Layer (Layer 2) - Receiving",
      description: "Frame verification and MAC address checking.",
      details: "Verifies frame integrity using CRC, checks if MAC address matches, handles error correction, and requests retransmission if needed.",
      transformation: "Bits are reassembled into frames, checked for errors using CRC, and MAC addresses are validated before passing to network layer.",
      technical: "Error detection (CRC), Frame checking, MAC filtering, Flow control"
    },
    Network: {
      title: "🌐 Network Layer (Layer 3) - Receiving",
      description: "Packet routing and IP verification.",
      details: "Verifies IP addresses match, reassembles fragmented packets, checks TTL, and routes to correct protocol handler.",
      transformation: "IP headers are processed to ensure the packet arrived at the correct destination, then passed to transport layer.",
      technical: "IP address checking, Packet reassembly, Routing decisions, TTL decrement"
    },
    Transport: {
      title: "🚚 Transport Layer (Layer 4) - Receiving",
      description: "Segment reassembly and acknowledgment.",
      details: "Reassembles segments in correct order, acknowledges receipt, requests retransmission of missing segments, and ensures complete data delivery.",
      transformation: "Segments are reordered using sequence numbers and reassembled into complete data. Acknowledgment is sent back to sender.",
      technical: "Port number routing, TCP acknowledgment, UDP checks, Flow control"
    },
    Session: {
      title: "🤝 Session Layer (Layer 5) - Receiving",
      description: "Session management and synchronization.",
      details: "Manages the session, verifies checkpoints, handles dialog control, and coordinates orderly session termination.",
      transformation: "Session checkpoints verify all data was received correctly before closing the session and releasing resources.",
      technical: "Session checkpointing, Dialog control, Session termination, Synchronization"
    },
    Presentation: {
      title: "🔐 Presentation Layer (Layer 6) - Receiving",
      description: "Decryption and data reformatting.",
      details: "Decrypts data using appropriate keys, decompresses if needed, and converts from network format back to application format.",
      transformation: "Data is decrypted, decompressed, and translated back into application-readable format.",
      technical: "Decryption, Decompression, Format conversion, Character set translation"
    },
    Application: {
      title: "📨 Application Layer (Layer 7) - Receiving",
      description: "Delivering data to the receiving application.",
      details: "The complete, original message is delivered to the receiving application in its original format, ready for user consumption.",
      transformation: (message) => `Your message "${message}" is fully reassembled, authenticated, and displayed to the recipient.`,
      technical: "Application interface, Data presentation, User interaction, API calls"
    }
  }
};

// Device configurations
export const devices = {
  PC: { icon: "🖥️", color: "#00ffb4", speed: 1.0, name: "Desktop Computer", specs: "Gigabit Ethernet" },
  Laptop: { icon: "💻", color: "#4CAF50", speed: 0.9, name: "Laptop", specs: "Wi-Fi 6" },
  Mobile: { icon: "📱", color: "#FF9800", speed: 0.8, name: "Smartphone", specs: "5G / Wi-Fi" },
  Server: { icon: "🖧", color: "#F44336", speed: 1.2, name: "Enterprise Server", specs: "10 Gigabit Ethernet" }
};

// Layer configuration
export const layers = [
  { name: "Application", y: 5, index: 0, layerNumber: 7 },
  { name: "Presentation", y: 3.5, index: 1, layerNumber: 6 },
  { name: "Session", y: 2, index: 2, layerNumber: 5 },
  { name: "Transport", y: 0.5, index: 3, layerNumber: 4 },
  { name: "Network", y: -1, index: 4, layerNumber: 3 },
  { name: "Data Link", y: -2.5, index: 5, layerNumber: 2 },
  { name: "Physical", y: -4, index: 6, layerNumber: 1 }
];