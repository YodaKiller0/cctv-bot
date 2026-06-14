const products = [
  {
    name: 'Hikvision 2MP Dome Camera',
    price: 'Rs. 4,500',
    description: 'Indoor dome camera, night vision, wide angle',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 4MP Bullet Camera',
    price: 'Rs. 7,500',
    description: 'Outdoor bullet camera, weatherproof, IR night vision',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 4G Camera',
    price: 'Rs. 12,500',
    description: 'No WiFi needed, uses 4G SIM, perfect for remote locations',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: '4 Channel DVR',
    price: 'Rs. 8,500',
    description: 'Supports 4 cameras, remote viewing, motion detection',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: '8 Channel DVR',
    price: 'Rs. 14,000',
    description: 'Supports 8 cameras, remote viewing, motion detection',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: '4 Camera Full Package',
    price: 'Rs. 35,000',
    description: '4 cameras + DVR + 1TB HDD + cables + installation',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: '8 Camera Full Package',
    price: 'Rs. 65,000',
    description: '8 cameras + DVR + 2TB HDD + cables + installation',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },

  // ========== HIKVISION CAMERAS ==========
  {
    name: 'Hikvision 2MP IR Dome Camera DS-2CE76D0T-EXIPF',
    price: 'Rs. 5,505',
    description: '2MP HD camera, IR night vision, 2.8mm lens, indoor/outdoor',
    category: 'hikvision',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 2MP Eco Dual-light Camera DS-2CE16D0T-EXLPF',
    price: 'Rs. 6,860',
    description: '2MP HD camera, dual-light night vision, 3.6mm lens',
    category: 'hikvision',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 2MP Dual-light Camera DS-2CE16D0T-LPFS',
    price: 'Rs. 7,766',
    description: '2MP HD camera, dual-light, 3.6mm lens, outdoor standard',
    category: 'hikvision',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 2MP ColorVu Camera DS-2CE10DF0T-PFS',
    price: 'Rs. 9,287',
    description: '2MP full color 24/7, ColorVu technology, 3.6mm lens',
    category: 'hikvision',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 2MP ColorVu with Two-way Audio DS-2CE10DF0T-LPTS',
    price: 'Rs. 11,389',
    description: '2MP ColorVu, two-way audio, dual-light, outdoor standard',
    category: 'hikvision',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 2MP ColorVu 3.0 DS-2CE10DF3T-PF',
    price: 'Rs. 12,115',
    description: '2MP ColorVu 3.0, full color night vision, 3.6mm lens',
    category: 'hikvision',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 5MP Dual-light Camera DS-2CE16K0T-LPFS',
    price: 'Rs. 9,964',
    description: '5MP HD camera, dual-light, 3.6mm lens, outdoor standard',
    category: 'hikvision',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 5MP ColorVu Camera DS-2CE10KF0T-LPFS',
    price: 'Rs. 14,124',
    description: '5MP full color 24/7, ColorVu technology, outdoor standard',
    category: 'hikvision',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 5MP ColorVu 3.0 DS-2CE10KF3T-L',
    price: 'Rs. 19,809',
    description: '5MP ColorVu 3.0, premium full color night vision',
    category: 'hikvision',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },

  // ========== HIKVISION DVR ==========
  {
    name: 'Hikvision 4 Channel DVR DS-7104HGHI-M1/T',
    price: 'Rs. 12,725',
    description: '4 channel HD DVR, supports up to 4 cameras, remote viewing',
    category: 'dvr',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 8 Channel DVR DS-7108HGHI-M1/T',
    price: 'Rs. 15,288',
    description: '8 channel HD DVR, supports up to 8 cameras, remote viewing',
    category: 'dvr',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 16 Channel DVR DS-7116HGHI-M1/T',
    price: 'Rs. 30,045',
    description: '16 channel HD DVR, supports up to 16 cameras, remote viewing',
    category: 'dvr',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 4 Channel Smart DVR iDS-7104HQHI-M1/T',
    price: 'Rs. 18,577',
    description: '4 channel smart DVR, AI features, motion detection, remote viewing',
    category: 'dvr',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 8 Channel Smart DVR iDS-7108HQHI-M1/T',
    price: 'Rs. 25,428',
    description: '8 channel smart DVR, AI features, motion detection, remote viewing',
    category: 'dvr',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 16 Channel Smart DVR iDS-7116HQHI-M1/T',
    price: 'Rs. 43,272',
    description: '16 channel smart DVR, AI features, motion detection, remote viewing',
    category: 'dvr',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },

  // ========== HIKVISION NVR (IP) ==========
  {
    name: 'Hikvision 4 Channel NVR DS-7604NI-Q1',
    price: 'Rs. 28,056',
    description: '4 channel NVR for IP cameras, remote viewing, motion detection',
    category: 'nvr',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 8 Channel NVR DS-7608NI-Q1',
    price: 'Rs. 32,025',
    description: '8 channel NVR for IP cameras, remote viewing, motion detection',
    category: 'nvr',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 16 Channel NVR DS-7616NI-Q2',
    price: 'Rs. 44,250',
    description: '16 channel NVR for IP cameras, 2 HDD slots, remote viewing',
    category: 'nvr',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },

  // ========== HIKVISION IP CAMERAS ==========
  {
    name: 'Hikvision 2MP IP Camera DS-2CD1023G0E-I',
    price: 'Rs. 15,569',
    description: '2MP IP camera, IR night vision, 4mm lens, outdoor',
    category: 'hikvision-ip',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 4MP IP Camera DS-2CD1043G0-I',
    price: 'Rs. 25,322',
    description: '4MP IP camera, IR night vision, 4mm lens, outdoor',
    category: 'hikvision-ip',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 4G PT Camera DS-2DE2C200MWG-E',
    price: 'Rs. 16,639',
    description: '2MP 4G PT camera, no WiFi needed, pan & tilt, remote control',
    category: 'hikvision-4g',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 4G PT Camera DS-2DE2C400MWG-E',
    price: 'Rs. 18,372',
    description: '4MP 4G PT camera, no WiFi needed, pan & tilt, remote control',
    category: 'hikvision-4g',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision 4G Solar Camera DS-2CFS04/4G',
    price: 'Rs. 27,036',
    description: '4G camera with solar panel, no power cable needed, outdoor',
    category: 'hikvision-4g',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'Hikvision WiFi Dongle DS-3WR3X-1',
    price: 'Rs. 1,165',
    description: 'WiFi dongle for Hikvision DVR, add wireless connectivity',
    category: 'accessories',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },

  // ========== IMOU CAMERAS ==========
  {
    name: 'IMOU Ranger 2 3MP WiFi PT Camera',
    price: 'Rs. 5,400',
    description: '3MP WiFi PT camera, 355° pan, night vision 10m, micro SD slot, two-way audio, indoor',
    category: 'imou',
    image: 'null'
  },
  {
    name: 'IMOU Ranger 2 Pro 3MP WiFi PT Camera',
    price: 'Rs. 7,360',
    description: '3MP WiFi PT camera, IR remote control, two-way audio, indoor',
    category: 'imou',
    image: 'https://i.imgur.com/GgP9mM6.jpeg'
  },
  {
    name: 'IMOU Ranger 2 Pro 5MP WiFi PT Camera',
    price: 'Rs. 9,476',
    description: '5MP 3K WiFi PT camera, smart tracking, human detection, two-way audio, indoor',
    category: 'imou',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Bulb Cam 2C 3MP WiFi PT',
    price: 'Rs. 6,815',
    description: '3MP bulb camera, fits in light socket, full color night vision, two-way audio',
    category: 'imou',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Bulb Cam 2C 5MP WiFi PT',
    price: 'Rs. 7,787',
    description: '5MP 3K bulb camera, full color night vision, siren & spotlight, two-way audio',
    category: 'imou',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Bulb Cam 3MP Bulb & Camera 2-in-1',
    price: 'Rs. 11,327',
    description: '3MP camera + LED bulb combined, 340° pan, full color, two-way audio',
    category: 'imou',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Ranger Mini 3MP Indoor Camera',
    price: 'Rs. 7,800',
    description: '3MP 2K WiFi camera, smart tracking, human detection, two-way audio, WiFi 6',
    category: 'imou',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Ranger Mini 5MP Indoor Camera',
    price: 'Rs. 9,900',
    description: '5MP 3K WiFi camera, smart tracking, human detection, two-way audio, WiFi 6',
    category: 'imou',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Ranger Dual 3MP+3MP PT Camera',
    price: 'Rs. 13,886',
    description: 'Dual lens PT camera, 3MP+3MP, smart tracking, active deterrence, IP67 outdoor',
    category: 'imou',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Bullet 2E 3MP Outdoor WiFi Camera',
    price: 'Rs. 10,304',
    description: '3MP 2K outdoor bullet, 30m night vision, IP67 weatherproof, human detection',
    category: 'imou',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Bullet 3 3MP Outdoor WiFi Camera',
    price: 'Rs. 11,787',
    description: '3MP outdoor bullet, 30m night vision, 110dB siren, spotlight, IP67',
    category: 'imou',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Cell 3C 5MP Battery Camera',
    price: 'Rs. 22,425',
    description: '5MP 3K battery camera, 5000mAh rechargeable, no wiring needed, WiFi',
    category: 'imou',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Cruiser SC 3MP Outdoor PT WiFi',
    price: 'Rs. 12,944',
    description: '3MP outdoor PT camera, 30m night vision, siren, spotlight, IP67, WiFi 6',
    category: 'imou',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Cruiser SC 5MP Outdoor PT WiFi',
    price: 'Rs. 15,518',
    description: '5MP 3K outdoor PT camera, 30m night vision, siren, spotlight, IP67, WiFi 6',
    category: 'imou',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Cruiser Dual 2 (3MP+3MP) Outdoor PT',
    price: 'Rs. 18,600',
    description: 'Dual lens outdoor PT, 3MP+3MP, active deterrence, siren, IP67, WiFi 6',
    category: 'imou',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Cruiser Dual 2 (5MP+5MP) Outdoor PT',
    price: 'Rs. 22,400',
    description: 'Dual lens outdoor PT, 5MP+5MP, active deterrence, siren, IP67, WiFi 6',
    category: 'imou',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Cruiser Triple (3MP+3MP+5MP) Outdoor PT',
    price: 'Rs. 27,800',
    description: 'Triple lens outdoor PT, AI vehicle & human detection, active deterrence, IP67',
    category: 'imou',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Cruiser Z 5MP 12x Zoom WiFi Camera',
    price: 'Rs. 28,000',
    description: '5MP outdoor PT camera, 12x hybrid zoom, 56m night vision, WiFi',
    category: 'imou',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Titan Pro 6MP WiFi POE Camera',
    price: 'Rs. 23,200',
    description: '6MP aurora color night vision, 3K+, dual-band WiFi 6, 125dB siren',
    category: 'imou',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },

  // ========== IMOU 4G CAMERAS ==========
  {
    name: 'IMOU Cruiser SC 4G 3MP Camera',
    price: 'Rs. 14,200',
    description: '3MP 4G LTE camera, no WiFi needed, outdoor PT, active deterrence, IP66',
    category: 'imou-4g',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Cruiser SC 4G 5MP Camera',
    price: 'Rs. 17,950',
    description: '5MP 4G LTE camera, no WiFi needed, outdoor PT, siren, spotlight, IP66',
    category: 'imou-4g',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Cruiser Dual 4G (3MP+3MP)',
    price: 'Rs. 22,500',
    description: 'Dual lens 4G camera, 3MP+3MP, AI detection, active deterrence, outdoor',
    category: 'imou-4g',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU AOV PT 5MP 4G Solar Camera',
    price: 'Rs. 26,822',
    description: '5MP 4G camera with solar panel, 10000mAh battery, no wiring, outdoor',
    category: 'imou-4g',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU AOV Dual 5MP+5MP Solar 4G Camera',
    price: 'Rs. 39,480',
    description: 'Dual 5MP 4G+WiFi, solar + 10000mAh battery, 24/7 recording, outdoor',
    category: 'imou-4g',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },

  // ========== IMOU NVR ==========
  {
    name: 'IMOU 10 Channel Wireless NVR',
    price: 'Rs. 14,450',
    description: '10 channel wireless NVR, auto pairing, HDMI/VGA, supports up to 16TB HDD',
    category: 'nvr',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU 18 Channel Wireless NVR',
    price: 'Rs. 19,500',
    description: '18 channel wireless NVR, dual antenna, HDMI/VGA, supports up to 8TB HDD',
    category: 'nvr',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },

  // ========== IMOU SD CARDS ==========
  {
    name: 'IMOU 64GB Micro SD Card',
    price: 'Rs. 4,000',
    description: 'Micro SD card designed for security cameras, 64GB',
    category: 'accessories',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU 128GB Micro SD Card',
    price: 'Rs. 7,000',
    description: 'Micro SD card designed for security cameras, 128GB',
    category: 'accessories',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU 256GB Micro SD Card',
    price: 'Rs. 9,500',
    description: 'Micro SD card designed for security cameras, 256GB',
    category: 'accessories',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },

  // ========== IMOU CLOUD PLANS ==========
  {
    name: 'IMOU Protect Basic Plan (Annual)',
    price: 'Rs. 9,250',
    description: '7 days cloud storage, device health guard, security report, annual plan',
    category: 'cloud',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Protect Plus Plan (Annual)',
    price: 'Rs. 17,955',
    description: '30 days cloud storage, enhanced AI detection, security report, annual plan',
    category: 'cloud',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },

  // ========== IMOU SMART HOME ==========
  {
    name: 'IMOU Smart Lock K1-G-W-EN',
    price: 'Rs. 33,213',
    description: 'Smart door lock, multiple unlock methods, aluminum alloy body, 2 year warranty',
    category: 'smart-home',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Dual-band Router HR12F-B',
    price: 'Rs. 6,950',
    description: '1200Mbps dual-band WiFi router, IMOU camera auto sync, IPTV support',
    category: 'smart-home',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  },
  {
    name: 'IMOU Smart Bulb CL1B-5-E27',
    price: 'Rs. 1,730',
    description: 'Smart LED bulb, 16 million colors, voice control, dimmable, WiFi',
    category: 'smart-home',
    image: 'YOUR_GOOGLE_DRIVE_LINK_HERE'
  }

]

module.exports = products