const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
// Middleware
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Demo user data
const users = [
  {
    id: 1,
    email: "ansh@boardkonnect.com",
    password: "demo123", // In a real app, this would be hashed
    profile: {
      name: "John Doe",
      country: "USA",
      company: "Board Games Inc",
      branch: "New York",
      position: "Senior Manager",
      avatar: "https://hulk.s3.ap-south-1.amazonaws.com/avatar1.png"
    }
  },
  {
    id: 2,
    email: "partha@boardkonnect.com",
    password: "demo123",
    profile: {
      name: "Sarah Smith",
      country: "UK",
      company: "Game Masters Ltd",
      branch: "London",
      position: "Director",
      avatar: "https://hulk.s3.ap-south-1.amazonaws.com/avatar2.png"
    }
  },
  {
    id: 3,
    email: "ceo@boardkonnect.com",
    password: "demo123",
    profile: {
      name: "Alex Wilson",
      country: "India",
      company: "Strategic Games",
      branch: "Mumbai",
      position: "Product Manager",
      avatar: "https://hulk.s3.ap-south-1.amazonaws.com/avatar3.png"
    }
  },
  {
    id: 4,
    email: "cto@boardkonnect.com",
    password: "demo123",
    profile: {
      name: "Maria Garcia",
      country: "Russia",
      company: "Fun & Games SA",
      branch: "Madrid",
      position: "CEO",
      avatar: "https://hulk.s3.ap-south-1.amazonaws.com/avatar4.png"
    }
  }
];

// Login API endpoint
app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    // Find user
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    // Return user data
    res.json({
      success: true,
      user: userWithoutPassword
    });

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get user profile API endpoint
app.get('/api/user/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Sample data for the home page
const homePageData = {
  carousel: [
    {
      image: "https://c.ndtvimg.com/2025-04/5i44bmb_trump-tariffs_625x300_07_April_25.jpeg",
      title: "India To Avoid Retaliation",
      subtitle: "US Tariffs, Will Instead Focus On",
      url: "https://www.ndtv.com/world-news/india-to-avoid-retaliation-on-us-tariffs-focus-on-trade-deal-talks-report-8105456"
    },
    {
      image: "https://images.cnbctv18.com/uploads/2025/02/dbs-bank-2025-02-1d7993128f0fc01b6d7d21d5ca9e505e.jpg?im=FitAndFill,width=500,height=300",
      title: "DBS Bank India names Ambuj Chandna",
      subtitle: "Santanu Mitra to lead key business units",
      url: "https://www.cnbctv18.com/business/finance/dbs-bank-india-new-appointments-ambuj-chandna-santanu-mitra-key-business-units-lead-19585659.htm"
    },
    {
      image: "https://bsmedia.business-standard.com/_media/bs/img/article/2025-03/10/thumb/fitandfill/1200X630/1741576561-254.jpg",
      title: "RBI maintains FPI investment",
      subtitle: "corp bonds for FY26 | Finance News",
      url: "https://www.business-standard.com/finance/news/rbi-maintains-fpi-investment-caps-in-govt-securities-corp-bonds-for-fy26-125040301232_1.html"
    }
  ],
  grcContent: [
    {
      title: "Governance",
      image: "https://hulk.s3.ap-south-1.amazonaws.com/company_2ba91a7ab8.png",
      route: "/list?title=governance"
    },
    {
      title: "Risk Audit",
      image: "https://hulk.s3.ap-south-1.amazonaws.com/speedometer_f039e95200.png",
      route: "/list?title=risk audit"
    },
    {
      title: "Compliance",
      image: "https://hulk.s3.ap-south-1.amazonaws.com/compliant_9e544fbcc9.png",
      route: "/list?title=compliance"
    }
  ],
  customerARR: [
    {
      source: "https://www.newsonprojects.com/uploads/news/075741.jpg",
      title: "ARR-₹15.T",
      url: "https://www.ril.com/"
    },
    {
      source: "https://play-lh.googleusercontent.com/POGVZhNvSh05yA01H2VTlElv0Mw6r4R7hj9w7DaOvJVgiGoi0Fcawi02yITkyMT1zwqO=w240-h480-rw",
      title: "ARR-₹14.03T",
      url: "https://www.hdfcbank.com/"
    },
    {
      source: "https://be.tricentis.com/media-assets/2024/04/TCS_NewLogo_Final_CMYK_Black.png",
      title: "ARR-₹11.9T",
      url: "https://www.tcs.com/"
    },
    {
      source: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLTWDVKnWNY-rE76XIFDKeJHmTM8yCc1FEzA&s",
      title: "ARR-₹10.30T",
      url: "https://www.airtel.in/"
    },
    {
      source: "https://annapurnafinance.in/wp-content/uploads/2019/02/ICICI-Bank.png",
      title: "ARR-₹9.3T",
      url: "https://www.icicibank.com/"
    }
  ]
};
const dataUSA={
    carousel:[
        {
          "url": "https://www.usatoday.com/story/money/2025/04/07/what-is-a-recession-definition/82975206007/",
          "image": "https://www.usatoday.com/gcdn/authoring/authoring-images/2025/04/07/USAT/82977092007-2209011822.jpg?crop=5999,3375,x0,y400&width=3200&height=1801&format=pjpg&auto=webp",
          "subtitle": "Understanding economic downturns and their impact",
          "title": "Recession Basics Explained"
        },
        {
          "url": "https://www.bbc.com/news/articles/cg41l00eg5go",
          "image": "https://ichef.bbci.co.uk/news/1024/branded_news/73d7/live/54a2e8e0-10ab-11f0-b234-07dc7691c360.png",
          "subtitle": "Insights into the latest global developments",
          "title": "Global News Highlights"
        },
        {
          "url": "https://www.theguardian.com/us-news/live/2025/apr/04/us-business-stock-markets-nyse-blog-trump-tariffs-asian-markets",
          "image": "https://i.guim.co.uk/img/media/837f6b4e52a42a3bf8295d1faa4781222cc64dde/0_0_4288_2573/master/4288.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctbGl2ZS5wbmc&enable=upscale&s=cb406a29f688de016df549a3595b6bd6",
          "subtitle": "Live updates on US stock markets and tariffs",
          "title": "US Market Live Blog"
        }
    ],
    grcContent: [
        {
          title: "Governance",
          image: "https://hulk.s3.ap-south-1.amazonaws.com/company_2ba91a7ab8.png",
          route: "/list?title=governance"
        },
        {
          title: "Risk Audit",
          image: "https://hulk.s3.ap-south-1.amazonaws.com/speedometer_f039e95200.png",
          route: "/list?title=risk audit"
        },
        {
          title: "Compliance",
          image: "https://hulk.s3.ap-south-1.amazonaws.com/compliant_9e544fbcc9.png",
          route: "/list?title=compliance"
        }
      ],
      customerARR: [
        {
          source: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyeo87Qcwf6tC2GOStKHkDZyfksWG_OsIMiA&s",
          title: "ARR-$3M",
          url: "https://www.dfas.mil/"
        },
        {
          source: "https://play-lh.googleusercontent.com/qp53mBI8DbQV3fiNlZKVf_6FjDgOAO76DCQLO7WpeJjiJn4lC90KQyKDkNQFtH3Ju-E",
          title: "ARR-$1.2M",
          url: "https://www.bankofamerica.com/"
        },
        {
          source: "https://imageio.forbes.com/specials-images/imageserve/5c13d2f64bbe6f0f2aa26233/0x0.jpg?format=jpg&crop=416,416,x0,y0,safe&height=87&width=87",
          title: "ARR-$1.1M",
          url: "https://www.cisco.com/site/in/en/index.html"
        },
        {
          source: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfJhtf564KV__Quog_F0ly7b-cD0ZKp9EKxA&s",
          title: "ARR-$1.1M",
          url: "https://store.legal.thomsonreuters.com/law-products/solutions/west-publisher"
        },
        {
          source: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR30h6ji4SmRPjBrpTxqQlxhoze9wkiGyLETmy_BsoSvjRAKS_4NQOIEFvtN21pJ2cR-Y&usqp=CAU",
          title: "ARR-$1M",
          url: "https://www.jnj.com/"
        }
      ]
}

const dataUK={
    carousel:[
        {
          "url": "https://www.bbc.com/news/articles/c89g7g5lx2ko",
          "image": "https://ichef.bbci.co.uk/news/1024/branded_news/679f/live/4f494d80-1290-11f0-ac9f-c37d6fd89579.jpg",
          "subtitle": "Starmer vows to protect UK business",
          "title": "All options remain on the table"
        },
        {
          "url": "https://www.theguardian.com/business/blog/live/2025/apr/07/global-stock-markets-brace-donald-trump-us-tariffs-business-live-updates-news",
          "image": "https://i.guim.co.uk/img/media/177.jpg",
          "subtitle": "Starmer says he will take a cool-headed",
          "title": "Starmer vows to protect UK businesses"
        },
        {
          "url": "https://www.insurancebusinessmag.com/uk/news/breaking-news/fiducia-expands-combined-liabilities-insurance-coverage-531331.aspx",
          "image": "https://cdn-res.keymedia.com/cms/images/us/018/0311_638796919555097495.png",
          "subtitle": "Fiducia expands combined liabilities insurance coverage",
          "title": "Fiducia expands coverage"
        }
      ]
      ,
      grcContent: [
        {
          title: "Governance",
          image: "https://hulk.s3.ap-south-1.amazonaws.com/company_2ba91a7ab8.png",
          route: "/list?title=governance"
        },
        {
          title: "Risk Audit",
          image: "https://hulk.s3.ap-south-1.amazonaws.com/speedometer_f039e95200.png",
          route: "/list?title=risk audit"
        },
        {
          title: "Compliance",
          image: "https://hulk.s3.ap-south-1.amazonaws.com/compliant_9e544fbcc9.png",
          route: "/list?title=compliance"
        }
      ],
        customerARR: [
          {
            source: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReUWMySoOIP1NZUOTrK_b5_SRanld3iMNVmQ&s",
            title: "ARR-$1.8M",
            url: "https://www.deutschebank.co.in/"
          },
          {
            source: "https://www.the-digital-insurer.com/wp-content/uploads/2021/01/HSBC-Global-Services-260x200.png",
            title: "ARR-$1.3M",
            url: "https://internationalservices.hsbc.com/"
          },
          {
            source: "https://www.openbanking.org.uk/wp-content/uploads/2021/04/Barclays-Bank-logo-375x375.png",
            title: "ARR-$0.8M",
            url: "https://home.barclays/who-we-are/structure-and-leadership/"
          },
          {
            source: "https://yt3.googleusercontent.com/mE3Rjp-AUUWwK7wQnLnf4IxtTXOTEjWh6nIynNo73JqYlt380TCODBfnJFDrefIbqveutijg3w=s900-c-k-c0x00ffffff-no-rj",
            title: "ARR-$0.7M",
            url: "https://www.aon.com/india/default.jsp"
          },
          {
            source: "https://media.licdn.com/dms/image/v2/D4E0BAQEDov-ZkIgdpw/company-logo_200_200/company-logo_200_200/0/1715850190053/aviva_plc_logo?e=2147483647&v=beta&t=d3nI49Unh0qy_id3hHnlhvWfDlqk7pY-h1n74hxOC1w",
            title: "ARR-$0.5M",
            url: "https://www.aviva.com/"
          }
        ]  
}

const dataRussia={  
    carousel:[
        {
          "url": "https://kyivindependent.com/us-did-not-impose-tariffs-on-russia-because-were-not-doing-business-trump-says/",
          "image": "https://assets.kyivindependent.com/content/images/2024/12/GettyImages-2177668198.jpg",
          "subtitle": "US avoids tariffs on Russia",
          "title": "Trump explains decision"
        },
        {
          "url": "https://www.business-standard.com/world-news/donald-trump-us-reciprocal-tariffs-russia-sanctions-vladimir-putin-125040300153_1.html",
          "image": "https://bsmedia.business-standard.com/_media/bs/img/article/2025-03/18/thumb/facecrop/1200X630/1742265380-6751.jpg",
          "subtitle": "Russia exempted from tariffs",
          "title": "Trump's tariff strategy"
        },
        {
          "url": "https://www.reuters.com/business/putin-names-little-known-firm-run-pharma-company-spun-off-germanys-stada-2025-04-04/",
          "image": "https://www.reuters.com/resizer/v2/34LCMZHGEZILBPSVQTFZP4MGOQ.jpg?auth=703408b2148fb3b412b827e7fb5097141dbad034885fca86f574aca0d1a287e7&width=1200&quality=80",
          "subtitle": "Putin appoints new firm",
          "title": "Russian pharma changes"
        }
      ],
      grcContent: [
        {
          title: "Governance",
          image: "https://hulk.s3.ap-south-1.amazonaws.com/company_2ba91a7ab8.png",
          route: "/list?title=governance"
        },
        {
          title: "Risk Audit",
          image: "https://hulk.s3.ap-south-1.amazonaws.com/speedometer_f039e95200.png",
          route: "/list?title=risk audit"
        },
        {
          title: "Compliance",
          image: "https://hulk.s3.ap-south-1.amazonaws.com/compliant_9e544fbcc9.png",
          route: "/list?title=compliance"
        }
      ],
        customerARR: [
          {
            source: "https://logowik.com/content/uploads/images/gazprom8746.logowik.com.webp",
            title: "$45.19B",
            url: "https://www.gazprom.com/"
          },
          {
            source: "https://example.com/images/monopoly.jpg",
            title: "$32.2B",
            url: "https://www.rosneft.com/"
          },
          {
            source: "https://upload.wikimedia.org/wikipedia/commons/a/af/Sberbank_logo_2020_en.png",
            title: "$28.89B",
            url: "https://www.sberbank.com/"
          },
          {
            source: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsih5bu8tIAGZLn5g2k1Z_GxPfJdBlS8TAFA&s",
            title: "$28.69B",
            url: "https://www.novatek.ru/en/"
          },
          {
            source: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/LUK_OIL_Logo.svg/1200px-LUK_OIL_Logo.svg.png",
            title: "$26.14B",
            url: "https://www.lukoil.com/"
          }
        ] 
      
}

//Sample data for Governance
const governanceIndia=[
    {
      title: 'Companies Act, 2013',
      subtitle: 'Legal framework for company governance',
      url: "/list?title=Governance"
    },
    {
      title: 'Securities and Exchange Board of India (SEBI)',
      subtitle: 'Market regulation and investor protection',
      url: "/list?title=Risk Audit"
    },
    {
      title: 'Other Regulatory Bodies',
      subtitle: 'Additional authorities overseeing compliance',
      url: "/list?title=Compliance"
    },
    {
      title: 'Board Composition',
      subtitle: 'Structure and roles of board',
      url: "/list?title=Compliance"
    },
    {
      title: 'Key Committees',
      subtitle: 'Essential governance sub-groups explained',
      url: "/list?title=Compliance"
    },
    {
      title: 'Duties of Directors',
      subtitle: 'Responsibilities and legal obligations overview',
      url: "/list?title=Compliance"
    }
  ]

const governanceUSA=[
        {
          title: 'Legal Framework',
          subtitle: 'Guidelines governing corporate actions',
          url: ''
        },
        {
          title: 'Board Structure and Responsibilities',
          subtitle: 'Roles and duties of directors',
          url: ''
        },
        {
          title: 'Listing Rules',
          subtitle: 'Regulations for public companies',
          url: ''
        },
        {
          title: 'Shareholder Rights',
          subtitle: 'Protections and voting entitlements',
          url: ''
        },
        {
          title: 'Risk Management and Compliance',
          subtitle: 'Monitoring risks and legal adherence',
          url: ''
        },
        {
          title: 'Transparency and Accountability',
          subtitle: 'Clear reporting and ethical governance',
          url: ''
        }
      ]
      

  const governanceUK=[
    {
      title: 'UK Corporate Governance Code',
      subtitle: 'Standards for corporate governance practices',
      url: ''
    },
    {
      title: 'Board Structure and Responsibilities',
      subtitle: 'Roles, duties, and composition overview',
      url: ''
    },
    {
      title: 'Legal Framework',
      subtitle: 'Regulations governing board activities',
      url: ''
    },
    {
      title: 'Risk Management and Compliance',
      subtitle: 'Identifying and addressing business risks',
      url: ''
    },
    {
      title: 'Shareholder Engagement',
      subtitle: 'Building strong investor relationships',
      url: ''
    },
    {
      title: 'Diversity and Succession Planning',
      subtitle: 'Ensuring inclusive leadership continuity',
      url: ''
    }
  ]
  

  const governanceRussia=[
    {
      title: 'Russian Civil Code (RCC)',
      subtitle: 'Foundation of civil legal framework',
      url: ''
    },
    {
      title: 'Federal Law on Joint-Stock Companies (JSC Law)',
      subtitle: 'Rules governing joint-stock companies',
      url: ''
    },
    {
      title: 'Securities Market Law',
      subtitle: 'Regulates public securities trading',
      url: ''
    },
    {
      title: 'Corporate Governance Code (CGC)',
      subtitle: 'Best practices for company management',
      url: ''
    },
    {
      title: 'Regulatory Oversight',
      subtitle: 'Monitoring compliance with laws',
      url: ''
    }
  ]
  
  //Sample data for Risk Audit
  const riskAuditIndia=[
    {
      title: 'Definition and Importance',
      subtitle: 'Understanding risk and its significance',
      url: ''
    },
    {
      title: 'Risk Management Framework',
      subtitle: 'Structured approach to managing risk',
      url: ''
    },
    {
      title: 'Regulatory Requirements',
      subtitle: 'Compliance with legal risk standards',
      url: ''
    },
    {
      title: 'Challenges in Risk Management',
      subtitle: 'Common obstacles and risk pitfalls',
      url: ''
    },
    {
      title: 'Industry-Specific Risk Management',
      subtitle: 'Tailored strategies for various sectors',
      url: ''
    }
  ]
  

  const riskAuditUSA=[
    {
      title: 'Definition and Importance',
      subtitle: 'Understanding risk and its significance',
      url: ''
    },
    {
      title: 'Risk Management Framework',
      subtitle: 'Structured approach to managing risk',
      url: ''
    },
    {
      title: 'Regulatory Requirements',
      subtitle: 'Compliance with legal risk standards',
      url: ''
    },
    {
      title: 'Challenges in Risk Management',
      subtitle: 'Common obstacles and risk pitfalls',
      url: ''
    },
    {
      title: 'Industry-Specific Risk Management',
      subtitle: 'Tailored strategies for various sectors',
      url: ''
    }
  ]

  const riskAuditUK=[
    {
      title: 'Definition and Importance',
      subtitle: 'Understanding risk and its significance',
      url: ''
    },
    {
      title: 'Risk Management Framework',
      subtitle: 'Structured approach to managing risk',
      url: ''
    },
    {
      title: 'Regulatory Requirements',
      subtitle: 'Compliance with legal risk standards',
      url: ''
    },
    {
      title: 'Challenges in Risk Management',
      subtitle: 'Common obstacles and risk pitfalls',
      url: ''
    },
    {
      title: 'Industry-Specific Risk Management',
      subtitle: 'Tailored strategies for various sectors',
      url: ''
    }
  ]

  const riskAuditRussia=[
    {
      title: 'Definition and Importance',
      subtitle: 'Understanding risk and its significance',
      url: ''
    },
    {
      title: 'Risk Management Framework',
      subtitle: 'Structured approach to managing risk',
      url: ''
    },
    {
      title: 'Regulatory Requirements',
      subtitle: 'Compliance with legal risk standards',
      url: ''
    },
    {
      title: 'Challenges in Risk Management',
      subtitle: 'Common obstacles and risk pitfalls',
      url: ''
    },
    {
      title: 'Industry-Specific Risk Management',
      subtitle: 'Tailored strategies for various sectors',
      url: ''
    }
  ]

  //Sample data for Compliance
  const complianceIndia=[
    {
      title: 'Definition and Importance',
      subtitle: 'Understanding compliance and its value',
      url: ''
    },
    {
      title: 'Types of Compliance',
      subtitle: 'Various forms across industries',
      url: ''
    },
    {
      title: 'Regulatory Bodies',
      subtitle: 'Organizations enforcing compliance rules',
      url: ''
    },
    {
      title: 'Challenges in Compliance',
      subtitle: 'Common issues organizations encounter',
      url: ''
    },
    {
      title: 'Certifications and Training',
      subtitle: 'Programs to enhance compliance knowledge',
      url: ''
    }
  ]
  

  const complianceUSA=[
    {
      title: 'Definition and Importance',
      subtitle: 'Understanding compliance and its value',
      url: ''
    },
    {
      title: 'Types of Compliance',
      subtitle: 'Various forms across industries',
      url: ''
    },
    {
      title: 'Regulatory Bodies',
      subtitle: 'Organizations enforcing compliance rules',
      url: ''
    },
    {
      title: 'Challenges in Compliance',
      subtitle: 'Common issues organizations encounter',
      url: ''
    },
    {
      title: 'Certifications and Training',
      subtitle: 'Programs to enhance compliance knowledge',
      url: ''
    }
  ]
  

  const complianceUK=[
    {
      title: 'Definition and Importance',
      subtitle: 'Understanding compliance and its value',
      url: ''
    },
    {
      title: 'Types of Compliance',
      subtitle: 'Various forms across industries',
      url: ''
    },
    {
      title: 'Regulatory Bodies',
      subtitle: 'Organizations enforcing compliance rules',
      url: ''
    },
    {
      title: 'Challenges in Compliance',
      subtitle: 'Common issues organizations encounter',
      url: ''
    },
    {
      title: 'Certifications and Training',
      subtitle: 'Programs to enhance compliance knowledge',
      url: ''
    }
  ]
  

  const complianceRussia=[
    {
      title: 'Definition and Importance',
      subtitle: 'Understanding compliance and its value',
      url: ''
    },
    {
      title: 'Types of Compliance',
      subtitle: 'Various forms across industries',
      url: ''
    },
    {
      title: 'Regulatory Bodies',
      subtitle: 'Organizations enforcing compliance rules',
      url: ''
    },
    {
      title: 'Challenges in Compliance',
      subtitle: 'Common issues organizations encounter',
      url: ''
    },
    {
      title: 'Certifications and Training',
      subtitle: 'Programs to enhance compliance knowledge',
      url: ''
    }
  ]
  

  //Settings Data

  const usaSettings=[
    {
      "title": "Financial statements",
      "subtitle": "Overview of company's fiscal health",
      "isEnabled": true,
      "type": "calender"
    },
    {
      "title": "Voting",
      "subtitle": "Cast decisions on key matters",
      "isEnabled": true,
      "type": "url"
    },
    {
      "title": "CEO report",
      "subtitle": "Leadership insights and strategic direction",
      "isEnabled": true,
      "type": "url"
    },
    {
      "title": "Audit committee report",
      "subtitle": "Review of financial controls & compliance",
      "isEnabled": true,
      "type": "url"
    },
    {
      "title": "To Do list",
      "subtitle": "Tasks scheduled for completion",
      "isEnabled": true,
      "type": "url"
    },
    {
      "title": "Calendar",
      "subtitle": "Upcoming events and deadlines",
      "isEnabled": true,
      "type": "calender"
    }
  ]
  
  const ukSettings=[
    {
      "title": "Financial statements",
      "subtitle": "Overview of company's fiscal health",
      "isEnabled": true,
      "type": "url"
    },
    {
      "title": "Voting",
      "subtitle": "Cast decisions on key matters",
      "isEnabled": false,
      "type": "url"
    },
    {
      "title": "CEO report",
      "subtitle": "Leadership insights and strategic direction",
      "isEnabled": true,
      "type": "url"
    },
    {
      "title": "Audit committee report",
      "subtitle": "Review of financial controls & compliance",
      "isEnabled": true,
      "type": "url"
    },
    {
      "title": "To Do list",
      "subtitle": "Tasks scheduled for completion",
      "isEnabled": true,
      "type": "url"
    },
    {
      "title": "Calendar",
      "subtitle": "Upcoming events and deadlines",
      "isEnabled": true,
      "type": "calender"
    }
  ]
  
  const russiaSettings=[
    {
      "title": "Financial statements",
      "subtitle": "Overview of company's fiscal health",
      "isEnabled": false,
      "type": "url"
    },
    {
      "title": "Voting",
      "subtitle": "Cast decisions on key matters",
      "isEnabled": false,
      "type": "url"
    },
    {
      "title": "CEO report",
      "subtitle": "Leadership insights and strategic direction",
      "isEnabled": false,
      "type": "url"
    },
    {
      "title": "Audit committee report",
      "subtitle": "Review of financial controls & compliance",
      "isEnabled": false,
      "type": "url"
    },
    {
      "title": "To Do list",
      "subtitle": "Tasks scheduled for completion",
      "isEnabled": false,
      "type": "url"
    },
    {
      "title": "Calendar",
      "subtitle": "Upcoming events and deadlines",
      "isEnabled": true,
      "type": "calender"
    }
  ]
  

  const indiaSettings=[
    {
      "title": "Financial statements",
      "subtitle": "Overview of company's fiscal health",
      "isEnabled": true,
      "type": "url"
    },
    {
      "title": "Voting",
      "subtitle": "Cast decisions on key matters",
      "isEnabled": false,
      "type": "url"
    },
    {
      "title": "CEO report",
      "subtitle": "Leadership insights and strategic direction",
      "isEnabled": true,
      "type": "url"
    },
    {
      "title": "Audit committee report",
      "subtitle": "Review of financial controls & compliance",
      "isEnabled": false,
      "type": "url"
    },
    {
      "title": "To Do list",
      "subtitle": "Tasks scheduled for completion",
      "isEnabled": true,
      "type": "url"
    },
    {
      "title": "Calendar",
      "subtitle": "Upcoming events and deadlines",
      "isEnabled": true,
      "type": "calender"
    }
  ]
  



// Home API endpoint
app.get('/api/home', (req, res) => {
  try {
    const userId = parseInt(req.query.userId);
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let data;
    switch (user.profile.country) {
      case 'India':
        data = homePageData;
        break;
      case 'USA':
        data = dataUSA;
        break;
      case 'UK':
        data = dataUK;
        break;
      case 'Russia':
        data = dataRussia;
        break;
      default:
        data = homePageData; // Default to India data
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GRC Content API endpoint
app.get('/api/grc_content/:id/:category', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const category = req.params.category;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    }

    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let data;
    // First get country-specific data
    switch (user.profile.country) {
      case 'India':
        // Then get category-specific data for India
        switch (category.toLowerCase()) {
          case 'governance':
            data = governanceIndia;
            break;
          case 'compliance':
            data = complianceIndia;
            break;
          case 'risk audit':
            data = riskAuditIndia;
            break;
          default:
            return res.status(400).json({ error: 'Invalid category' });
        }
        break;

      case 'USA':
        // Then get category-specific data for USA
        switch (category.toLowerCase()) {
          case 'governance':
            data = governanceUSA;
            break;
          case 'compliance':
            data = complianceUSA;
            break;
          case 'risk audit':
            data = riskAuditUSA;
            break;
          default:
            return res.status(400).json({ error: 'Invalid category' });
        }
        break;

      case 'UK':
        // Then get category-specific data for UK
        switch (category.toLowerCase()) {
          case 'governance':
            data = governanceUK;
            break;
          case 'compliance':
            data = complianceUK;
            break;
          case 'risk audit':
            data = riskAuditUK;
            break;
          default:
            return res.status(400).json({ error: 'Invalid category' });
        }
        break;

      case 'Russia':
        // Then get category-specific data for Russia
        switch (category.toLowerCase()) {
          case 'governance':
            data = governanceRussia;
            break;
          case 'compliance':
            data = complianceRussia;
            break;
          case 'risk audit':
            data = riskAuditRussia;
            break;
          default:
            return res.status(400).json({ error: 'Invalid category' });
        }
        break;

      default:
        // Default to India data if country is not recognized
        switch (category.toLowerCase()) {
          case 'governance':
            data = governanceIndia;
            break;
          case 'compliance':
            data = complianceIndia;
            break;
          case 'risk audit':
            data = riskAuditIndia;
            break;
          default:
            return res.status(400).json({ error: 'Invalid category' });
        }
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add this new endpoint after the existing endpoints
app.get('/api/settings/:country', (req, res) => {
  const { country } = req.params;
  const countryLower = country.toLowerCase();

  let settings;
  switch (countryLower) {
    case 'usa':
      settings = usaSettings;
      break;
    case 'uk':
      settings = ukSettings;
      break;
    case 'russia':
      settings = russiaSettings;
      break;
    case 'india':
      settings = indiaSettings;
      break;
    default:
      return res.status(400).json({ error: 'Invalid country code' });
  }

  // Filter out disabled settings
//   const enabledSettings = settings.filter(setting => setting.isEnabled);
  
  // Transform the data to match the frontend's expected format
//   const transformedSettings = enabledSettings.map(setting => ({
//     title: setting.title,
//     subtitle: setting.subtitle,
//     url: `/${setting.title.toLowerCase().replace(/\s+/g, '-')}`
//   }));

  res.json(settings);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
