# Airbnb Clone - Fully Functional Rental Platform

A comprehensive Airbnb-like platform built with Next.js, TypeScript, and Tailwind CSS. This application allows users to search, view, and book rental properties with a complete booking system and responsive design.

## 🌟 Features

### ✅ Homepage
- **Hero Section**: Eye-catching landing area with call-to-action
- **Search Bar**: Advanced search functionality with location, dates, and guest filters
- **Featured Listings**: Curated selection of top properties
- **Property Categories**: Browse by property type (Villa, Cabin, Loft, Cottage)
- **Top Rated Stays**: Showcase highest-rated properties

### ✅ Property Search & Listing
- **Advanced Filtering**: Filter by price range, property type, and amenities
- **Sorting Options**: Sort by relevance, price (low to high, high to low), rating, and review count
- **Real-time Results**: Dynamic filtering and sorting without page reloads
- **Responsive Grid**: Adaptive layout for different screen sizes

### ✅ Property Details
- **Image Gallery**: Multiple property images with interactive viewing
- **Comprehensive Information**: Detailed descriptions, amenities, and host information
- **Guest Reviews**: Display ratings and guest feedback
- **Host Profiles**: Superhost badges and host information

### ✅ Booking System
- **Date Selection**: Interactive check-in and check-out date pickers
- **Guest Management**: Specify number of guests with validation
- **Price Calculation**: Real-time total calculation including service fees
- **Guest Information**: Collect guest details for reservation
- **Booking Confirmation**: Complete confirmation page with booking details

### ✅ Database Integration
- **Mock Database**: Simulated database with properties and bookings
- **Data Persistence**: Store booking information
- **Type Safety**: Full TypeScript integration for data models

### ✅ Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Perfect layout for tablet screens
- **Desktop Experience**: Full-featured desktop interface
- **Cross-Browser**: Compatible with all modern browsers

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/airbnb-clone.git
   cd airbnb-clone
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
airbnb-clone/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage
│   ├── search/                   # Search results page
│   ├── property/[id]/            # Individual property pages
│   └── booking-confirmation/[id]/ # Booking confirmation pages
├── components/                   # Reusable React components
│   ├── search-bar.tsx           # Search functionality
│   ├── property-card.tsx        # Property listing cards
│   └── filters.tsx              # Search filters
├── lib/                         # Utility functions and data
│   ├── types.ts                 # TypeScript type definitions
│   └── data.ts                  # Mock database and functions
└── README.md                    # Project documentation
\`\`\`

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Image Handling**: Next.js Image optimization

## 🎯 Key Components

### SearchBar Component
- Location autocomplete
- Date range selection
- Guest count management
- URL parameter handling

### PropertyCard Component
- Image display with lazy loading
- Favorite functionality
- Rating and review display
- Responsive design

### Filters Component
- Price range slider
- Property type selection
- Amenity checkboxes
- Real-time filter application

### Booking System
- Form validation
- Price calculation
- Confirmation workflow
- Email integration ready

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🧪 Testing Checklist

### ✅ Search Functionality
- [x] Location search works correctly
- [x] Date filtering functions properly
- [x] Guest count validation
- [x] Filter combinations work together

### ✅ Property Display
- [x] Property cards load correctly
- [x] Images display properly
- [x] Property details page loads
- [x] Booking form functions

### ✅ Booking Process
- [x] Date selection works
- [x] Price calculation is accurate
- [x] Form validation prevents invalid submissions
- [x] Confirmation page displays correctly

### ✅ Responsive Design
- [x] Mobile layout works on phones
- [x] Tablet layout optimized
- [x] Desktop experience is complete
- [x] Images scale properly across devices

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Other Platforms
- **Netlify**: Drag and drop build folder
- **AWS**: Use AWS Amplify
- **Railway**: Connect GitHub repository

## 🔮 Future Enhancements

- **User Authentication**: Login/signup functionality
- **Real Database**: PostgreSQL or MongoDB integration
- **Payment Processing**: Stripe integration
- **Map Integration**: Google Maps for property locations
- **Real-time Chat**: Host-guest communication
- **Reviews System**: Complete review and rating system
- **Admin Dashboard**: Property management interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspired by Airbnb
- Built with modern React patterns
- Uses best practices for performance and accessibility

## 📞 Support

If you have any questions or need help with setup, please open an issue on GitHub or contact the development team.

---

**Happy Coding! 🎉**
