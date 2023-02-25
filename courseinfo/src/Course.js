import React from 'react';

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Total = ({ sumOfExercises }) => {
  return <p>Number of exercises {sumOfExercises}</p>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  );
};

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header course={course.name} />
      <Content course={course} />
      <Total sumOfExercises={totalExercises} />
    </div>
  );
};

export default Course;