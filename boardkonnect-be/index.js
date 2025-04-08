const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data for the home page
const homePageData = {
  carousel: [
    {
      image: "https://example.com/images/welcome.jpg",
      title: "Welcome to BoardKonnect",
      subtitle: "Your Ultimate Board Game Companion",
      url: "https://boardkonnect.com"
    },
    {
      image: "https://example.com/images/discover.jpg",
      title: "Discover New Games",
      subtitle: "Find your next favorite board game",
      url: "https://boardkonnect.com/discover"
    },
    {
      image: "https://example.com/images/connect.jpg",
      title: "Connect with Players",
      subtitle: "Join the board game community",
      url: "https://boardkonnect.com/community"
    }
  ],
  grcContent: [
    {
      title: "Governance ANSH",
      icon: "person.circle.fill",
      route: "/list?title=Age Restrictions"
    },
    {
      title: "Risk",
      icon: "person.circle.fill",
      route: "/list?title=Player Count"
    },
    {
      title: "Compliance",
      icon: "person.circle.fill",
      route: "/list?title=Game Duration"
    }
  ],
  customerARR: [
    {
      source: "https://example.com/images/catan.jpg",
      title: "Catan",
      url: "https://boardkonnect.com/games/catan"
    },
    {
      source: "https://example.com/images/monopoly.jpg",
      title: "Monopoly",
      url: "https://boardkonnect.com/games/monopoly"
    },
    {
      source: "https://example.com/images/chess.jpg",
      title: "Chess",
      url: "https://boardkonnect.com/games/chess"
    },
    {
      source: "https://example.com/images/scrabble.jpg",
      title: "Scrabble",
      url: "https://boardkonnect.com/games/scrabble"
    },
    {
      source: "https://example.com/images/risk.jpg",
      title: "Risk",
      url: "https://boardkonnect.com/games/risk"
    }
  ]
};

// Home page API endpoint
app.get('/api/home', (req, res) => {
  try {
    res.json(homePageData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
