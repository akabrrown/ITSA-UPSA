-- Seed Data for ITSA-UPSA MVP

-- Banner Slides
INSERT INTO public.banner_slides (image_url, headline, link_url, display_order, is_active) VALUES
('https://res.cloudinary.com/diovwh0fj/image/upload/v1/itsa/banner1.jpg', 'Welcome to ITSA-UPSA', '/about', 1, true),
('https://res.cloudinary.com/diovwh0fj/image/upload/v1/itsa/banner2.jpg', 'Join the Upcoming Tech Symposium', '/activities', 2, true);

-- President Speech
INSERT INTO public.president_speech (name, title, photo_url, message, video_url) VALUES
('Alex Kojo Appiah', 'President, ITSA', 'https://res.cloudinary.com/diovwh0fj/image/upload/v1/itsa/president.jpg', '<p>Welcome to the official digital home of the Information Technology Students Association (ITSA) at the University of Professional Studies, Accra. Our mission is to bridge the gap between academic theory and industry practice, equipping every IT student with the practical skills needed to thrive in the modern technological landscape.</p><p>We invite you to explore our resources, participate in our activities, and join us in shaping the future of technology in Ghana and beyond.</p>', null);

-- Department Info
INSERT INTO public.department_info (description, mission) VALUES
('<p>The Department of Information Technology Education at UPSA is dedicated to producing world-class IT professionals who are equipped with the analytical, technical, and leadership skills necessary to drive innovation in the digital age.</p>', 'To provide excellent IT education that fosters innovation, research, and practical problem-solving skills.');

-- Department Authorities
INSERT INTO public.department_authorities (full_name, title, photo_url, display_order) VALUES
('Dr. Emmanuel Owusu', 'Head of Department', 'https://res.cloudinary.com/diovwh0fj/image/upload/v1/itsa/hod.jpg', 1),
('Mr. Kwesi Arthur', 'Senior Lecturer', 'https://res.cloudinary.com/diovwh0fj/image/upload/v1/itsa/lecturer1.jpg', 2);

-- ITSA Executives
INSERT INTO public.itsa_executives (full_name, position, photo_url, bio, social_link, display_order) VALUES
('Alex Kojo Appiah', 'President', 'https://res.cloudinary.com/diovwh0fj/image/upload/v1/itsa/president.jpg', 'Passionate about software engineering and student leadership.', 'https://linkedin.com/in/alex-appiah', 1),
('Grace Osei', 'Vice President', 'https://res.cloudinary.com/diovwh0fj/image/upload/v1/itsa/vp.jpg', 'Advocate for women in tech and cybersecurity enthusiast.', null, 2),
('Samuel Mensah', 'Public Relations Officer', 'https://res.cloudinary.com/diovwh0fj/image/upload/v1/itsa/pro.jpg', 'Connecting students with industry opportunities.', null, 3);

-- News Posts
INSERT INTO public.news_posts (title, summary, body, is_published, published_at) VALUES
('ITSA Launches New Academic Bank', 'Students can now access lecture slides and past questions easily.', '<p>We are thrilled to announce the launch of our new digital Academic Bank. This platform centralizes all essential study materials, including lecture slides and past examination questions, categorized by course and level.</p>', true, now()),
('Upcoming Workshop: Intro to Cloud Computing', 'Join us next week for a hands-on session on AWS and Azure.', '<p>Get ready for an intensive, practical workshop where industry experts will guide you through the fundamentals of cloud computing using Amazon Web Services (AWS) and Microsoft Azure.</p>', true, now());

-- Activities
INSERT INTO public.activities (title, description, venue, start_date, status) VALUES
('ITSA Tech Symposium 2026', '<p>Our annual flagship event bringing together industry leaders, alumni, and students for a day of tech talks, networking, and project exhibitions.</p>', 'UPSA LBC Auditorium', now() + interval '14 days', 'upcoming'),
('Annual General Meeting 2025', '<p>The end-of-year meeting to discuss the association''s achievements, financial reports, and hand over to the newly elected executives.</p>', 'UPSA Justice Hall', now() - interval '60 days', 'past');

-- Tutorials (Dummy Data)
INSERT INTO public.tutorials (title, description, video_url, thumbnail_url, course, level, lecturer_name, is_published) VALUES
('Introduction to Database Systems', 'A comprehensive overview of relational databases, SQL queries, and normalization.', 'https://res.cloudinary.com/diovwh0fj/video/upload/v1/itsa/db-tutorial.mp4', 'https://res.cloudinary.com/diovwh0fj/image/upload/v1/itsa/db-thumb.jpg', 'Database Systems', '200', 'Mr. Kwesi Arthur', true);

-- Academic Resources (Dummy Data)
INSERT INTO public.academic_resources (title, resource_type, course, level, academic_year, file_url, file_size_kb) VALUES
('Programming with C++ Lecture Slides', 'slide', 'Programming I', '100', '2025/2026', 'https://res.cloudinary.com/diovwh0fj/image/upload/v1/itsa/cpp-slides.pdf', 2048),
('Data Structures Past Question 2024', 'past_question', 'Data Structures', '200', '2024/2025', 'https://res.cloudinary.com/diovwh0fj/image/upload/v1/itsa/ds-pq.pdf', 1024);
