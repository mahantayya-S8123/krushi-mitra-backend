# KrushiMitra - Smart Digital Companion for Farmers 🌾

A comprehensive web application designed specifically for rural farmers in India, providing access to mandi prices, marketplace, services, and farming advisory in multiple languages.

## 🌟 Features

### 📊 Dashboard
- Dynamic welcome messages based on time of day
- Real-time statistics (prices, weather, planting days)
- Quick navigation to all features
- Recent activity feed
- Voice-enabled welcome messages

### 💰 Mandi Prices
- Live crop prices from markets across India
- Voice support to read prices aloud
- Price filtering and sorting
- Price alerts and notifications
- Market information and trends

### 🛒 Marketplace
- Product browsing with categories (seeds, fertilizers, pesticides, equipment)
- Shopping cart functionality
- Product search and filtering
- Featured products section
- Shopping tips and guidelines

### 🚜 Services
- Service provider listings (tractor rental, harvesting, irrigation, etc.)
- Booking system with date/time selection
- Provider ratings and contact information
- Service provider registration
- Booking guidelines

### 🌱 Advisory
- Weather updates and forecasts
- Farming tips and seasonal advice
- Government schemes information
- Crop calendar with planting/harvesting seasons
- Expert consultation booking
- Search functionality for advice

## 🌐 Multi-Language Support

The application supports three languages:
- **English** - Default language
- **हिंदी (Hindi)** - For Hindi-speaking farmers
- **मराठी (Marathi)** - For Marathi-speaking farmers

## 🎤 Voice Support

- **Text-to-Speech**: Read content aloud using Web Speech API
- **Speech Recognition**: Voice commands for navigation
- **Multi-language Voice**: Supports Hindi, Marathi, and English voices
- **Accessibility**: Screen reader friendly

## 📱 Mobile-First Design

- **Responsive Layout**: Works on all screen sizes
- **Touch-Friendly**: Large buttons and touch targets
- **Rural-Optimized**: Designed for users with limited digital literacy
- **Offline Support**: Local storage for form data and preferences

## 🛠 Technical Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **No Frameworks**: Vanilla JavaScript for better performance
- **CSS Grid & Flexbox**: Modern layout techniques
- **Web APIs**: Speech Synthesis, Local Storage, Fetch API
- **Accessibility**: WCAG 2.1 compliant

## 📁 Project Structure

```
my-frontend/
├── index.html                 # Login/Signup page
├── dashboard.html             # Main dashboard
├── mandi-prices.html         # Live price data
├── marketplace.html          # Product marketplace
├── services.html             # Service providers
├── advisory.html             # Farming advisory
├── assets/
│   ├── css/
│   │   └── main.css          # Shared styles
│   └── images/               # Image assets
└── js/
    ├── common.js             # Shared utilities
    ├── auth.js               # Authentication logic
    ├── dashboard.js          # Dashboard functionality
    ├── mandi-prices.js       # Price data handling
    ├── marketplace.js        # Shopping cart logic
    ├── services.js           # Service booking
    └── advisory.js           # Advisory features
```

## 🚀 Getting Started

### Installation

1. **Clone or Download** the project files
2. **Navigate** to the `my-frontend` directory
3. **Open** `index.html` in a modern web browser (Chrome, Firefox, Edge, Safari)

### Usage

1. **Sign Up**: Create a new account or use test credentials
2. **Login**: Access the dashboard with your credentials
3. **Explore**: Navigate to different features using the menu
4. **Use Voice**: Click the microphone button to enable voice features
5. **Change Language**: Select your preferred language from the dropdown

### Test Credentials

For testing purposes, you can use any email and password to login. The application uses localStorage for data storage.

Example:
- **Email**: farmer@example.com
- **Password**: password123

## 🎯 Key Features for Rural Users

### Visual Design
- **Earth Tones**: Green and orange color scheme
- **Large Icons**: Emoji-based icons for universal understanding
- **Clear Typography**: Poppins font for better readability
- **High Contrast**: Accessible color combinations

### User Experience
- **Simple Navigation**: Clear menu structure
- **Help Text**: Guidance for all form fields
- **Error Handling**: Friendly error messages
- **Loading States**: Visual feedback for all actions

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators
- **Reduced Motion**: Respects user preferences

## 🔧 Customization

### Adding New Languages
1. Add translations to translations object in `js/common.js`
2. Add language option to dropdown in HTML
3. Update voice language mapping

### Adding New Features
1. Create new HTML page
2. Add corresponding JavaScript file
3. Update navigation in all pages
4. Add styles to `main.css`

### Mock Data
All data is currently simulated using mock API calls. To connect to real APIs:
1. Replace `mockApiCall()` function in `js/common.js`
2. Update data structures in individual JS files
3. Add error handling for network requests

## 📝 Browser Compatibility

- **Chrome** (recommended) - Full support
- **Firefox** - Full support
- **Edge** - Full support
- **Safari** - Full support
- **Opera** - Full support

## 🔒 Privacy & Security

- All data is stored locally in the browser (localStorage)
- No data is sent to external servers (in mock mode)
- Password validation on client-side
- Form data is cleared on logout

## 🐛 Known Issues

- Voice synthesis may not work on all browsers
- Some features require modern browser support
- Images are represented using emojis (replace with actual images)

## 📞 Support

For technical support or feature requests:
- **Phone**: +91 1800 123 4567
- **Email**: support@krushimitra.com
- **Website**: https://krushimitra.com

## 🤝 Contributing

This project is designed to help rural farmers in India. Contributions are welcome for:
- Additional language support
- New farming features
- Accessibility improvements
- Performance optimizations

## 📄 License

This project is created for educational and social impact purposes. Please ensure proper attribution when using or modifying the code.

## 🎨 Design Guidelines

### Color Palette
- **Primary Green**: #2E8B57
- **Primary Orange**: #FF8C42
- **Secondary Green**: #90EE90
- **Secondary Orange**: #FFA07A
- **Dark Green**: #1f5d3f
- **Light Green**: #E8F5E9
- **Light Orange**: #FFF4E6

### Typography
- **Font Family**: Poppins
- **Weights**: 300, 400, 600, 700
- **Base Size**: 16px
- **Line Height**: 1.6

### Spacing
- **XS**: 0.5rem (8px)
- **SM**: 1rem (16px)
- **MD**: 1.5rem (24px)
- **LG**: 2rem (32px)
- **XL**: 3rem (48px)

## 🚀 Future Enhancements

- Backend integration for real data
- Mobile app version
- Offline PWA support
- More language support
- Advanced analytics
- Machine learning recommendations
- Community features
- Social sharing

---

**KrushiMitra** - Empowering farmers with digital technology 🌾✨

