import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { coursesAdd, setUser } from '../Redux/ReduxSlice'
import { useState, useEffect } from 'react';
import { db } from '../config/firbase';
import { collection, doc, addDoc, getDoc, getDocs, where } from "firebase/firestore";
import CoursesList from './CoursesList';
import { query } from 'firebase/database';
import { useSearchParams } from 'react-router-dom';


const courses = [
    {
        id: 2,
        name: 'Advanced React Native',
        instructor: 'Jane Smith',
        description: 'Dive deeper into React Native and learn advanced techniques.',
        enrollmentStatus: 'Open',
        thumbnail: 'your.image.here',
        duration: '10 weeks',
        schedule: 'Mondays and Wednesdays, 6:00 PM - 9:00 PM',
        location: 'Online',
        prerequisites: ['Introduction to React Native'],
        syllabus: [
            {
                week: 1,
                topic: 'Advanced Components',
                content: 'Exploring more complex React Native components and patterns.'
            },
            {
                week: 2,
                topic: 'State Management',
                content: 'Using Redux and Context API for state management in React Native.'
            },
            // Additional weeks and topics...
        ],
        students: [
            {
                id: 103,
                name: 'Charlie Brown',
                email: 'charlie@example.com',
            },
            {
                id: 104,
                name: 'Diana Prince',
                email: 'diana@example.com',
            },
            // Additional enrolled students...
        ],
    },
    {
        id: 3,
        name: 'Introduction to Python',
        instructor: 'Michael Johnson',
        description: 'Learn the basics of Python programming and scripting.',
        enrollmentStatus: 'Open',
        thumbnail: 'your.image.here',
        duration: '6 weeks',
        schedule: 'Wednesdays, 7:00 PM - 9:00 PM',
        location: 'Online',
        prerequisites: ['None'],
        syllabus: [
            {
                week: 1,
                topic: 'Getting Started with Python',
                content: 'Introduction to Python syntax, setting up your environment.'
            },

            {
                week: 2,
                topic: 'Data Structures',
                content: 'Understanding lists, tuples, and dictionaries in Python.'
            },
            // Additional weeks and topics...
        ],
        students: [
            {
                id: 105,
                name: 'Emma Watson',
                email: 'emma@example.com',
            },
            {
                id: 103,
                name: 'Charlie Brown',
                email: 'charlie@example.com',
            },
            {
                id: 106,
                name: 'John Wick',
                email: 'john@example.com',
            },
            // Additional enrolled students...
        ],
    },
    {
        id: 4,
        name: 'Machine Learning Basics',
        instructor: 'Sarah Connor',
        description: 'An introductory course on machine learning concepts and techniques.',
        enrollmentStatus: 'Closed',
        thumbnail: 'your.image.here',
        duration: '12 weeks',
        schedule: 'Fridays, 5:00 PM - 8:00 PM',
        location: 'Online',
        prerequisites: ['Introduction to Python', 'Basic Statistics'],
        syllabus: [
            {
                week: 1,
                topic: 'Introduction to Machine Learning',
                content: 'Understanding the basics of machine learning and its applications.'
            },
            {
                week: 2,
                topic: 'Supervised Learning',
                content: 'Introduction to supervised learning algorithms and techniques.'
            },
            // Additional weeks and topics...
        ],
        students: [
            {
                id: 107,
                name: 'Bruce Wayne',
                email: 'bruce@example.com',
            },
            {
                id: 103,
                name: 'Charlie Brown',
                email: 'charlie@example.com',
            },
            {
                id: 108,
                name: 'Clark Kent',
                email: 'clark@example.com',
            },
            // Additional enrolled students...
        ],
    },
    {
        id: 5,
        name: 'Web Development with HTML & CSS',
        instructor: 'Peter Parker',
        description: 'Learn how to build beautiful websites using HTML and CSS.',
        enrollmentStatus: 'Open',
        thumbnail: 'your.image.here',
        duration: '4 weeks',
        schedule: 'Thursdays, 6:00 PM - 8:00 PM',
        location: 'Online',
        prerequisites: ['None'],
        syllabus: [
            {
                week: 1,
                topic: 'Introduction to HTML',
                content: 'Understanding the structure of a webpage with HTML.'
            },
            {
                week: 2,
                topic: 'Styling with CSS',
                content: 'Learn how to style webpages using CSS.'
            },
            // Additional weeks and topics...
        ],
        students: [
            {
                id: 109,
                name: 'Tony Stark',
                email: 'tony@example.com',
            },
            {
                id: 110,
                name: 'Steve Rogers',
                email: 'steve@example.com',
            },
            {
                id: 103,
                name: 'Charlie Brown',
                email: 'charlie@example.com',
            },
            // Additional enrolled students...
        ],
    },
    {
        id: 6,
        name: 'Data Analysis with R',
        instructor: 'Ada Lovelace',
        description: 'Learn data analysis and visualization techniques using R.',
        enrollmentStatus: 'In Progress',
        thumbnail: 'your.image.here',
        duration: '8 weeks',
        schedule: 'Tuesdays, 5:00 PM - 7:00 PM',
        location: 'Online',
        prerequisites: ['Basic Statistics'],
        syllabus: [
            {
                week: 1,
                topic: 'Introduction to R',
                content: 'Setting up R and RStudio, basic syntax and operations.'
            },
            {
                week: 2,
                topic: 'Data Manipulation',
                content: 'Using dplyr for data manipulation.'
            },
            // Additional weeks and topics...
        ],
        students: [
            {
                id: 111,
                name: 'Natasha Romanoff',
                email: 'natasha@example.com',
            },
            {
                id: 112,
                name: 'Wanda Maximoff',
                email: 'wanda@example.com',
            },
            // Additional enrolled students...
        ],
    },
    {
        id: 7,
        name: 'Introduction to Cybersecurity',
        instructor: 'Edward Snowden',
        description: 'Understand the basics of cybersecurity and how to protect systems.',
        enrollmentStatus: 'Open',
        thumbnail: 'your.image.here',
        duration: '10 weeks',
        schedule: 'Saturdays, 1:00 PM - 3:00 PM',
        location: 'Online',
        prerequisites: ['Basic Computer Knowledge'],
        syllabus: [
            {
                week: 1,
                topic: 'Introduction to Cybersecurity',
                content: 'Understanding the landscape of cybersecurity.'
            },
            {
                week: 2,
                topic: 'Threats and Vulnerabilities',
                content: 'Identifying common threats and vulnerabilities.'
            },
            // Additional weeks and topics...
        ],
        students: [
            {
                id: 113,
                name: 'Barbara Gordon',
                email: 'barbara@example.com',
            },
            {
                id: 114,
                name: 'Harley Quinn',
                email: 'harley@example.com',
            },
            // Additional enrolled students...
        ],
    },
    {
        id: 8,
        name: 'Blockchain Fundamentals',
        instructor: 'Satoshi Nakamoto',
        description: 'Learn the basics of blockchain technology and its applications.',
        enrollmentStatus: 'Open',
        thumbnail: 'your.image.here',
        duration: '6 weeks',
        schedule: 'Mondays, 4:00 PM - 6:00 PM',
        location: 'Online',
        prerequisites: ['None'],
        syllabus: [
            {
                week: 1,
                topic: 'Introduction to Blockchain',
                content: 'Understanding the basics of blockchain technology.'
            },
            {
                week: 2,
                topic: 'Cryptocurrency',
                content: 'Introduction to cryptocurrencies and their workings.'
            },
            // Additional weeks and topics...
        ],
        students: [
            {
                id: 115,
                name: 'Victor Stone',
                email: 'victor@example.com',
            },
            {
                id: 116,
                name: 'Barry Allen',
                email: 'barry@example.com',
            },
            // Additional enrolled students...
        ],
    },
    {
        id: 9,
        name: 'Intro to Cloud Computing',
        instructor: 'Jeff Bezos',
        description: 'Learn the basics of cloud computing and how to use cloud services.',
        enrollmentStatus: 'Open',
        thumbnail: 'your.image.here',
        duration: '8 weeks',
        schedule: 'Thursdays, 3:00 PM - 5:00 PM',
        location: 'Online',
        prerequisites: ['None'],
        syllabus: [
            {
                week: 1,
                topic: 'Introduction to Cloud Computing',
                content: 'Understanding cloud computing and its benefits.'
            },

            {
                week: 2,
                topic: 'Cloud Service Models',
                content: 'Exploring different cloud service models: IaaS, PaaS, and SaaS.'
            },
            // Additional weeks and topics...
        ],
        students: [
            {
                id: 117,
                name: 'Diana Prince',
                email: 'diana@example.com',
            },
            {
                id: 103,
                name: 'Charlie Brown',
                email: 'charlie@example.com',
            },
            {
                id: 118,
                name: 'Arthur Curry',
                email: 'arthur@example.com',
            },
            // Additional enrolled students...
        ],
    },
    {
        id: 10,
        name: 'Digital Marketing Basics',
        instructor: 'Gary Vaynerchuk',
        description: 'Learn the fundamentals of digital marketing and online brand building.',
        enrollmentStatus: 'Open',
        thumbnail: 'your.image.here',
        duration: '5 weeks',
        schedule: 'Wednesdays, 6:00 PM - 8:00 PM',
        location: 'Online',
        prerequisites: ['None'],
        syllabus: [
            {
                week: 1,
                topic: 'Introduction to Digital Marketing',
                content: 'Understanding the basics of digital marketing.'
            },
            {
                week: 2,
                topic: 'SEO and SEM',
                content: 'Learning about search engine optimization and marketing.'
            },
            // Additional weeks and topics...
        ],
        students: [
            {
                id: 119,
                name: 'Selina Kyle',
                email: 'selina@example.com',
            },
            {
                id: 120,
                name: 'Pamela Isley',
                email: 'pamela@example.com',
            },
            // Additional enrolled students...
        ],
    },
    {
        id: 11,
        name: 'Fundamentals of UX Design',
        instructor: 'Don Norman',
        description: 'Learn the principles of user experience design and how to apply them.',
        enrollmentStatus: 'In Progress',
        thumbnail: 'your.image.here',
        duration: '8 weeks',
        schedule: 'Tuesdays and Thursdays, 7:00 PM - 9:00 PM',
        location: 'Online',
        prerequisites: ['Basic Graphic Design Knowledge'],
        syllabus: [
            {
                week: 1,
                topic: 'Introduction to UX Design',
                content: 'Understanding user experience design and its importance.'
            },
            {
                week: 2,
                topic: 'User Research',
                content: 'Learning how to conduct user research and gather insights.'
            },
            // Additional weeks and topics...
        ],
        students: [
            {
                id: 121,
                name: 'Oliver Queen',
                email: 'oliver@example.com',
            },
            {
                id: 122,
                name: 'Roy Harper',
                email: 'roy@example.com',
            },
            // Additional enrolled students...
        ],
    },
    {
        id: 12,
        name: 'Introduction to Data Science',
        instructor: 'Andrew Ng',
        description: 'Learn the fundamentals of data science and start analyzing data.',
        enrollmentStatus: 'Open',
        thumbnail: 'your.image.here',
        duration: '12 weeks',
        schedule: 'Fridays, 6:00 PM - 9:00 PM',
        location: 'Online',
        prerequisites: ['Basic Python Knowledge', 'Basic Statistics'],
        syllabus: [
            {
                week: 1,
                topic: 'Introduction to Data Science',
                content: 'Understanding the data science process and its applications.'
            },
            {
                week: 2,
                topic: 'Data Cleaning',
                content: 'Learning techniques for cleaning and preparing data.'
            },
            // Additional weeks and topics...
        ],
        students: [
            {
                id: 123,
                name: 'Bruce Banner',
                email: 'bruce@example.com',
            },
            {
                id: 124,
                name: 'Peter Quill',
                email: 'peter@example.com',
            },
            // Additional enrolled students...
        ],
    },
];

function Home() {
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();
    // console.log(JSON.stringify(cource,null,2))
    const reduxcources = useSelector((state) => state.app.courses)
    const searchItems = useSelector((state) => state.app.SearchItem)
    const Initial = useSelector((state) => state.app.Initial)
    const user = useSelector((state) => state.app.user)
    console.log("this is redux ", searchItems)

    const searchValue = searchParams.get("search")

    const students = courses.flatMap(item =>
        item.students.map(s => ({
            ...s,
            enrolled_courses: {
                course_id: item.id,
                course_name: item.name,
                progress: Math.floor(Math.random() * 101)
            }
        }))
    );

    const studentWithKey = students.reduce((acc, item) => {
        if (!acc[item.name]) {
            acc[item.name] = [];
        }
        acc[item.name].push(item);
        return acc;
    }, {});

    const FinalStudentdata = Object.entries(studentWithKey).map(([name, items]) => ({
        name,
        id: items[0].id,
        email: items[0].email,
        enrolledCourses: items.map(item => item.enrolled_courses)
    }));

    const saveData = async () => {
        try {
            const studentCollectionRef = collection(db, "students");
            FinalStudentdata.forEach(async (element) => {
                await addDoc(studentCollectionRef, element);
            });
            console.log("Courses have been successfully added to Firestore");
        } catch (error) {
            console.error("Error adding courses to Firestore: ", error);
        }
    };

    const GetData = async () => {
        try {
            const coursesCollectionRef = collection(db, "courses");
            const querySnapshot = await getDocs(coursesCollectionRef);
            const coursesList = querySnapshot.docs.map(doc => doc.data());
            dispatch(coursesAdd(coursesList))
        } catch (error) {
            console.log(error);
        }
    }


    const getUser = async () => {
        try {
            const studentId = 103;
            const q = query(collection(db, 'students'), where("id", "==", studentId));
            const querySnapshot = await getDocs(q);
            const [user] = querySnapshot.docs.map(doc => doc.data());
            console.log("this is user", user)
            dispatch(setUser(user))
        } catch (error) {
            console.log('Error getting document:', error);
        }
    };


    useEffect(() => {
        if (Initial) return
        GetData()
        getUser();
    }, [Initial])

    const courselist = (searchValue ? searchItems : reduxcources)


    return (

        <>
            <div className='MainContainer p-2 '>

                <h1 className='font-bold my-6 text-[#345] text-4xl mt-20'> Listed Courses</h1>

                {courselist.length > 0 ? (
                    <div className='grid gap-10 px-5' style={{ gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))" }}>
                        {
                            courselist.map((course, index) => (
                                <CoursesList course={course} key={index} />
                            ))
                        }
                    </div>
                ) : (
                    <div className='text-center my-4 text-black text-2xl font-bold'>No courses Found</div>  // Show message if no courses are available
                )}
            </div>
        </>
    )
}

export default Home