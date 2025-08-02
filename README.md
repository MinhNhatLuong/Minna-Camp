# 🌍 Minna Camp! 🏝️✈️  

Welcome my project - **Campground Blog**, a platform where you can share your favorite campground destinations, post your experiences, and interact with others by leaving comments and ratings!  

## ✨ Features  

- 📝 **Post about your favorite places** – Share photos, descriptions, price and experiences.  
- ⭐ **Rate destinations** – Give ratings to places based on your experiences.  
- 💬 **Comment on posts** – Engage with the community and discuss travel tips.  
- 🔍 **Discover new places** – Browse through posts shared by fellow travelers.  

## 🧰 Technologies
- **Framework**: Express.js (Node.js web application framework)
- **Database**: MongoDB with Mongoose ODM
- **Template Engine**: EJS (Embedded JavaScript)
- **Authentication**: Passport.js
- **Image Upload**: Cloudinary
- **Maps**: Mapbox
- **Security**: 
  - Helmet (Security Headers)
  - Express Mongo Sanitize
  - Express Session
- **Other Libraries**:
  - Connect Flash (for flash messages)
  - Method Override
  - Joi (for data validation)
  - dotenv (environment variables)

## 🔧 Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running
- Cloudinary account
- Mapbox account

## 🚀 Getting Started  

### 1️⃣ Clone the Repository  
```
git clone https://github.com/MinhNhatLuong/Minna-Camp.git
cd Minna-Camp
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
MAPBOX_TOKEN=your_mapbox_token
DB_URL=your_mongodb_url
SESSION_SECRET=your_session_secret
```

### 4️⃣ Set Up Database
Make sure MongoDB is running on your system. The application will connect to MongoDB using the DB_URL from your environment variables.

### 5️⃣ Run the Project
```bash
npm start
```
The application will start on `http://localhost:3000` by default.

## 💡 Usage Guide

1. **Registration/Login**
   - Create a new account or login with existing credentials
   - Authentication is required for creating, editing, and deleting campgrounds

2. **Campgrounds**
   - View all campgrounds on the main page
   - Click on individual campgrounds for detailed information
   - Add new campgrounds with images, description, and location
   - Edit or delete your own campgrounds

3. **Reviews**
   - Leave reviews and ratings on campgrounds
   - View others' reviews
   - Edit or delete your own reviews

4. **Maps**
   - Interactive map shows all campground locations
   - Individual campground pages display specific location

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
