# Blog Feature Setup Guide

## Overview
The blog feature allows users to create, read, update, and delete blog posts. It includes:
- Public blog viewing (no login required)
- User authentication for creating, liking, and commenting
- AI-powered blog content generation using OpenAI
- Image support for blog posts
- Comments and likes system
- User-specific blog management

## Environment Variables

### Required Environment Variables

Add the following environment variable to your backend `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### Getting an OpenAI API Key

1. Go to [OpenAI's website](https://openai.com/)
2. Sign up or log in to your account
3. Navigate to the API section
4. Generate a new API key
5. Copy the key and add it to your `.env` file

**Important Security Notes:**
- Never commit your API key to version control
- Keep your API key secure and don't share it
- Monitor your OpenAI usage to avoid unexpected charges
- Consider setting usage limits in your OpenAI dashboard

## API Endpoints

### Public Endpoints (No Authentication Required)
- `GET /api/blogs` - Get all published blogs with pagination
- `GET /api/blogs/:id` - Get a specific blog by ID

### Protected Endpoints (Authentication Required)
- `POST /api/blogs/generate-content` - Generate blog content using AI
- `POST /api/blogs` - Create a new blog
- `GET /api/blogs/user/my-blogs` - Get current user's blogs
- `PUT /api/blogs/:id` - Update a blog (author only)
- `DELETE /api/blogs/:id` - Delete a blog (author only)
- `POST /api/blogs/:id/like` - Like/unlike a blog
- `POST /api/blogs/:id/comment` - Add a comment to a blog

## Frontend Routes

- `/blog` - View all blogs
- `/blog?user=true` - View current user's blogs (My Blogs)
- `/blog/create` - Create a new blog
- `/blog/edit/:id` - Edit an existing blog
- `/blog/:id` - View a specific blog

## Features

### For All Users (No Login Required)
- Browse all published blogs
- Read blog content
- View blog statistics (likes, comments, views)
- Search blogs by title and content

### For Logged-in Users
- Create new blog posts
- Edit and delete their own blogs
- Like and unlike blogs
- Comment on blogs
- AI-powered content generation
- Add multiple images to blogs
- Tag blogs for better organization
- View their own blogs in "My Blogs" section

### AI Content Generation
- Users can enter a blog title and generate content automatically
- Uses OpenAI's GPT-3.5-turbo model
- Generated content is marked as "AI Generated"
- Requires valid OpenAI API key

## Database Models

### Blog Model
- Title, content, author information
- Images with captions
- Tags for categorization
- Likes and comments arrays
- View tracking with IP addresses
- Publication status and timestamps
- AI generation flag

### Comment Schema (Embedded)
- Author reference
- Content and timestamp
- Nested within blog documents

## Usage Instructions

1. **Setup Environment**: Add your OpenAI API key to the backend `.env` file
2. **Start Services**: Ensure both backend and frontend are running
3. **Access Blogs**: Navigate to `/blog` to view all blogs
4. **Create Account**: Sign up/login to create blogs and interact
5. **Create Blog**: Use "Create Blog" button or sidebar link
6. **AI Generation**: Enter a title and click "AI Generate" for automatic content
7. **Manage Blogs**: Access "My Blogs" from the user sidebar

## Troubleshooting

### Common Issues

1. **AI Generation Not Working**
   - Check if OPENAI_API_KEY is set in backend .env
   - Verify API key is valid and has sufficient credits
   - Check backend console for error messages

2. **Authentication Issues**
   - Ensure user is logged in for protected features
   - Check if JWT token is valid and not expired

3. **Image Display Issues**
   - Verify image URLs are accessible
   - Check for CORS issues with external image hosts

4. **Blog Not Appearing**
   - Check if blog is published (isPublished: true)
   - Verify database connection
   - Check for any validation errors

## Security Considerations

- All user inputs are validated on both frontend and backend
- Authentication required for sensitive operations
- Author verification for edit/delete operations
- Rate limiting recommended for AI generation endpoint
- Image URLs are validated but not uploaded to prevent abuse
