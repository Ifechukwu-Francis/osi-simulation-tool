const initDb = require('./db');

const questions = [
  { question: "How many layers does the OSI model have?", option1: "5", option2: "6", option3: "7", option4: "8", answer: "7" },
  { question: "Which layer is responsible for routing packets between networks?", option1: "Data Link", option2: "Network", option3: "Transport", option4: "Application", answer: "Network" },
  { question: "What is the PDU called at Layer 2 (Data Link)?", option1: "Segment", option2: "Packet", option3: "Frame", option4: "Bits", answer: "Frame" },
  { question: "Which layer handles encryption and data compression?", option1: "Session", option2: "Presentation", option3: "Application", option4: "Transport", answer: "Presentation" },
  { question: "What protocol operates at the Transport Layer for reliable delivery?", option1: "UDP", option2: "HTTP", option3: "TCP", option4: "IP", answer: "TCP" },
  { question: "Which layer converts data into 1s and 0s for transmission?", option1: "Network", option2: "Data Link", option3: "Physical", option4: "Transport", answer: "Physical" },
  { question: "What does MAC stand for?", option1: "Media Access Control", option2: "Machine Address Code", option3: "Multi-Access Channel", option4: "Memory Access Controller", answer: "Media Access Control" },
  { question: "At which layer do switches primarily operate?", option1: "Layer 1", option2: "Layer 2", option3: "Layer 3", option4: "Layer 4", answer: "Layer 2" },
  { question: "What is the PDU called at Layer 4 (Transport)?", option1: "Frame", option2: "Packet", option3: "Segment", option4: "Bits", answer: "Segment" },
  { question: "Which layer establishes, manages, and terminates connections between applications?", option1: "Session", option2: "Transport", option3: "Network", option4: "Data Link", answer: "Session" },
  { question: "What port number is used by HTTP?", option1: "25", option2: "443", option3: "80", option4: "21", answer: "80" },
  { question: "What is the primary function of the Network Layer?", option1: "Error detection", option2: "Logical addressing and routing", option3: "Data encryption", option4: "Flow control", answer: "Logical addressing and routing" },
  { question: "Which OSI layer is closest to the end user?", option1: "Physical", option2: "Transport", option3: "Application", option4: "Network", answer: "Application" },
  { question: "What is encapsulation?", option1: "Breaking data into bits", option2: "Wrapping data with protocol headers at each layer", option3: "Encrypting data for security", option4: "Compressing data to save bandwidth", answer: "Wrapping data with protocol headers at each layer" },
  { question: "At which layer does a router operate?", option1: "Layer 1", option2: "Layer 2", option3: "Layer 3", option4: "Layer 4", answer: "Layer 3" },
  { question: "What does DNS stand for?", option1: "Digital Network Service", option2: "Domain Name System", option3: "Dynamic Network Setup", option4: "Data Naming Standard", answer: "Domain Name System" },
  { question: "Which protocol is connectionless and used for fast transmission?", option1: "TCP", option2: "FTP", option3: "UDP", option4: "SMTP", answer: "UDP" },
  { question: "What layer does FTP operate at?", option1: "Network", option2: "Transport", option3: "Session", option4: "Application", answer: "Application" },
  { question: "What is the purpose of ARP?", option1: "Assign IP addresses", option2: "Resolve IP addresses to MAC addresses", option3: "Encrypt network traffic", option4: "Manage network sessions", answer: "Resolve IP addresses to MAC addresses" },
  { question: "Which layer adds a trailer to detect errors?", option1: "Network", option2: "Transport", option3: "Data Link", option4: "Physical", answer: "Data Link" },
  { question: "What port does HTTPS use?", option1: "80", option2: "25", option3: "443", option4: "110", answer: "443" },
  { question: "What is de-encapsulation?", option1: "Adding headers to data", option2: "Removing protocol headers as data moves up layers", option3: "Splitting data into packets", option4: "Converting data to binary", answer: "Removing protocol headers as data moves up layers" },
  { question: "Which device operates at Layer 1 (Physical)?", option1: "Router", option2: "Switch", option3: "Hub", option4: "Firewall", answer: "Hub" },
  { question: "What does SMTP stand for?", option1: "Simple Mail Transfer Protocol", option2: "Secure Message Transport Protocol", option3: "Standard Media Transfer Process", option4: "Simple Media Transport Protocol", answer: "Simple Mail Transfer Protocol" },
  { question: "At which layer does SSL/TLS operate?", option1: "Application", option2: "Presentation", option3: "Session", option4: "Transport", answer: "Presentation" },
  { question: "What is the correct order of encapsulation from top to bottom?", option1: "Bits → Frame → Packet → Segment → Data", option2: "Data → Segment → Packet → Frame → Bits", option3: "Data → Packet → Segment → Frame → Bits", option4: "Frame → Packet → Segment → Data → Bits", answer: "Data → Segment → Packet → Frame → Bits" },
  { question: "How many bits are in a MAC address?", option1: "32", option2: "48", option3: "64", option4: "128", answer: "48" },
  { question: "What layer does ICMP operate at?", option1: "Data Link", option2: "Network", option3: "Transport", option4: "Application", answer: "Network" },
  { question: "What is the main function of the Transport Layer?", option1: "Routing packets", option2: "End-to-end delivery and error recovery", option3: "Data encryption", option4: "Physical signal transmission", answer: "End-to-end delivery and error recovery" },
  { question: "Which protocol is used for file transfers?", option1: "HTTP", option2: "SNMP", option3: "FTP", option4: "DHCP", answer: "FTP" },
  { question: "What does IP stand for?", option1: "Internet Protocol", option2: "Internal Process", option3: "Interface Program", option4: "Interconnect Protocol", answer: "Internet Protocol" },
  { question: "Which layer handles flow control?", option1: "Physical", option2: "Data Link", option3: "Transport", option4: "Both Data Link and Transport", answer: "Both Data Link and Transport" },
  { question: "What is the PDU called at Layer 1 (Physical)?", option1: "Frame", option2: "Packet", option3: "Segment", option4: "Bits", answer: "Bits" },
  { question: "Which layer converts frames to bits?", option1: "Network", option2: "Data Link", option3: "Physical", option4: "Transport", answer: "Physical" },
  { question: "What does OSI stand for?", option1: "Open System Interconnection", option2: "Operating System Interface", option3: "Open Standard Integration", option4: "Optical Signal Interface", answer: "Open System Interconnection" },
  { question: "What is the purpose of a subnet mask?", option1: "Encrypt data", option2: "Identify the network and host portions of an IP address", option3: "Assign MAC addresses", option4: "Control data flow", answer: "Identify the network and host portions of an IP address" },
  { question: "Which layer uses port numbers to identify applications?", option1: "Network", option2: "Data Link", option3: "Transport", option4: "Session", answer: "Transport" },
  { question: "What is a socket?", option1: "A physical connector", option2: "IP address + Port number combination", option3: "A type of protocol", option4: "A network cable", answer: "IP address + Port number combination" },
  { question: "Which version of IP uses 128-bit addresses?", option1: "IPv4", option2: "IPv6", option3: "IPv5", option4: "IPv3", answer: "IPv6" },
  { question: "What protocol automatically assigns IP addresses?", option1: "DNS", option2: "DHCP", option3: "ARP", option4: "NAT", answer: "DHCP" },
  { question: "What is the purpose of a default gateway?", option1: "Store MAC addresses", option2: "Route traffic to other networks", option3: "Assign IP addresses", option4: "Filter packets", answer: "Route traffic to other networks" },
  { question: "Which layer does a proxy server operate at?", option1: "Network", option2: "Transport", option3: "Application", option4: "Data Link", answer: "Application" },
  { question: "What does CRC stand for?", option1: "Cyclic Redundancy Check", option2: "Central Routing Control", option3: "Compressed Redundancy Code", option4: "Connection Routing Channel", answer: "Cyclic Redundancy Check" },
  { question: "At which layer does a bridge operate?", option1: "Layer 1", option2: "Layer 2", option3: "Layer 3", option4: "Layer 4", answer: "Layer 2" },
  { question: "What is the well-known port for SSH?", option1: "21", option2: "22", option3: "23", option4: "25", answer: "22" },
  { question: "What does NAT stand for?", option1: "Network Address Translation", option2: "Network Access Terminal", option3: "Node Address Table", option4: "Network Authentication Token", answer: "Network Address Translation" },
  { question: "Which layer ensures data is delivered error-free and in sequence?", option1: "Network", option2: "Data Link", option3: "Transport (TCP)", option4: "Physical", answer: "Transport (TCP)" },
  { question: "What is the maximum theoretical speed of a standard Ethernet connection?", option1: "10 Mbps", option2: "100 Mbps", option3: "1 Gbps", option4: "All of the above depending on the standard", answer: "All of the above depending on the standard" },
  { question: "What layer would you troubleshoot if a user has no IP address?", option1: "Physical", option2: "Data Link", option3: "Network", option4: "Application", answer: "Network" },
  { question: "Which is NOT a valid OSI layer?", option1: "Presentation", option2: "Compression", option3: "Session", option4: "Application", answer: "Compression" },
];

async function seed() {
  console.log('Connecting to database...');
  const db = await initDb();

  console.log(`Inserting ${questions.length} questions...\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    try {
      await db.run(
        `INSERT INTO questions (question, option1, option2, option3, option4, answer)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [q.question, q.option1, q.option2, q.option3, q.option4, q.answer]
      );
      success++;
      console.log(`✓ [${i + 1}/${questions.length}] Added: ${q.question}`);
    } catch (err) {
      failed++;
      console.log(`✗ [${i + 1}/${questions.length}] Failed: ${err.message}`);
    }
  }

  console.log(`\n--- Done ---`);
  console.log(`✓ Successful: ${success}`);
  console.log(`✗ Failed: ${failed}`);
  process.exit(0);
}

seed();