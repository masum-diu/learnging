# Background Video Upload Instructions

## কীভাবে আপনার নিজের video upload করবেন:

### ১. Video File রাখুন
আপনার video file এই ফোল্ডারে রাখুন:
```
e:\learnging\public\videos\
```

### ২. File Name
Video file এর নাম: `hero-bg.mp4` ব্যবহার করুন

### ৩. Video Format
সুপারিশকৃত format:
- **Format**: MP4
- **Resolution**: 1920x1080 (Full HD) বা 1280x720 (HD)
- **Duration**: 15-30 seconds (loop এর জন্য)
- **File Size**: 5-15 MB (optimal performance এর জন্য)
- **Codec**: H.264 video, AAC audio

### ৪. Code আপডেট
`pages/index.js` এ video source পরিবর্তন করুন:

```javascript
<source 
  src="/videos/hero-bg.mp4"
  type="video/mp4" 
/>
```

### ৫. Video Optimization Tools
- **FFmpeg**: `ffmpeg -i input.mp4 -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4`
- **Online**: [CloudConvert](https://cloudconvert.com/), [TinyVid](https://tinyvid.io/)

## বর্তমান Video Source

আমরা এখন একটি Pexels থেকে free video ব্যবহার করছি:
```
https://videos.pexels.com/video-files/3718444/3718444-sd_640_360_25fps.mp4
```

এটি একটি শিক্ষামূলক background video যা perfect fit।

## Important Notes

1. **Fallback**: যদি video load না হয়, gradient overlay দেখা যাবে
2. **Performance**: Large video files site speed কমায়
3. **Mobile**: Mobile devices এ সব browsers video autoplay সাপোর্ট করে না
4. **Loop**: Video স্বয়ংক্রিয়ভাবে loop হবে
5. **Muted**: Video muted থাকবে (autoplay এর জন্য প্রয়োজনীয়)

## Example: আপনার নিজের Video ব্যবহার করুন

```bash
# Windows এ FFmpeg দিয়ে optimize করুন:
ffmpeg -i your-video.mov -c:v libx264 -crf 23 -s 1920x1080 -c:a aac hero-bg.mp4

# Linux/Mac:
ffmpeg -i your-video.mov -c:v libx264 -crf 23 -vf scale=1920:1080 -c:a aac hero-bg.mp4
```

তারপর file এই path এ রাখুন:
```
e:\learnging\public\videos\hero-bg.mp4
```

এবং `pages/index.js` এ URL পরিবর্তন করুন।
