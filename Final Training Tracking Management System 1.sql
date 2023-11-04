create schema training_tracking_management_system;
use training_tracking_management_system;

CREATE TABLE credentials (
    credential_id INT AUTO_INCREMENT,
    user_id VARCHAR(50),
    password VARCHAR(100),
    role VARCHAR(20),
    updated_date DATE,
    updated_by VARCHAR(30),
    created_date DATE,
    created_by VARCHAR(30),
    
    CONSTRAINT pk_credential_id PRIMARY KEY (credential_id)
);

CREATE TABLE program (
  program_id INT AUTO_INCREMENT,
  program_code VARCHAR(10),
  program_name VARCHAR(50),
  program_description VARCHAR(256),
  theory_time INT,
  practice_time INT,
  updated_date DATE,
  updated_by VARCHAR(30),
  created_date DATE,
  created_by VARCHAR(30),
  
  CONSTRAINT pk_program_id PRIMARY KEY (program_id)
);

CREATE TABLE batch (
  batch_id INT AUTO_INCREMENT,
  batch_code VARCHAR(10),
  batch_name VARCHAR(30),
  batch_startdate DATE,
  created_date DATE,
  created_by VARCHAR(30),
  updated_date DATE,
  updated_by VARCHAR(30),
  
  CONSTRAINT pk_batch_id PRIMARY KEY (batch_id)
);

CREATE TABLE course (
  course_id INT AUTO_INCREMENT,
  program_id INT DEFAULT NULL,
  course_code VARCHAR(10),
  course_name VARCHAR(30),
  course_description VARCHAR(256),
  practice_time INT,
  theory_time INT,
  created_date DATE,
  created_by VARCHAR(30),
  updated_date DATE,
  updated_by VARCHAR(30),
  
  CONSTRAINT pk_course_id PRIMARY KEY (course_id),
  CONSTRAINT fk_course_program_id FOREIGN KEY (program_id) REFERENCES program(program_id) ON DELETE CASCADE
);

CREATE TABLE topic (
  topic_id INT AUTO_INCREMENT,
  course_id INT DEFAULT NULL,
  order_num INT,
  topic_code VARCHAR(10) DEFAULT 'RANDOM' ,
  topic_name VARCHAR(50),
  topic_percentage_completed INT,
  topic_summary VARCHAR(256),
  theory_time INT,
  practical_time INT,
  content VARCHAR(256),
  updated_date DATE,
  updated_by VARCHAR(30),
  created_date DATE,
  created_by VARCHAR(30),
  
  CONSTRAINT pk_topic_id PRIMARY KEY (topic_id),
  CONSTRAINT fk_topic_course_id FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
);

CREATE TABLE teacher (
  teacher_id INT AUTO_INCREMENT,
  teacher_code VARCHAR(10),
  teacher_name VARCHAR(20),
  teacher_email VARCHAR(30),
  updated_by VARCHAR(30),
  updated_date DATE,
  created_by VARCHAR(30),
  created_date DATE,
  
  CONSTRAINT pk_teacher_id PRIMARY KEY (teacher_id)
);

CREATE TABLE teacher_course (
  teacher_course_id INT AUTO_INCREMENT,
  teacher_id INT DEFAULT NULL,
  course_id INT DEFAULT NULL,
  
  CONSTRAINT pk_teacher_course PRIMARY KEY (teacher_course_id),
  CONSTRAINT fk_teacher_course_teacher_id FOREIGN KEY (teacher_id) REFERENCES teacher (teacher_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_teacher_course_course_id FOREIGN KEY (course_id) REFERENCES course (course_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE batch_teacher_course (
	batch_teacher_course_id INT AUTO_INCREMENT,
    batch_id INT DEFAULT NULL,
    courseteacher_course_id INT DEFAULT NULL,
    
    CONSTRAINT pk_batch_teacher_course_id PRIMARY KEY (batch_teacher_course_id),
	CONSTRAINT fk_batch_teacher_course_batch_id FOREIGN KEY (batch_id) REFERENCES batch (batch_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_batch_teacher_course_teacher_course_id FOREIGN KEY (teacher_course_id) REFERENCES teacher_course (teacher_course_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE student (
  student_id INT AUTO_INCREMENT,
  program_id INT DEFAULT NULL,
  batch_id INT DEFAULT NULL,
  student_code VARCHAR(10),
  student_name VARCHAR(30),
  student_email VARCHAR(30),
  created_date DATE,
  created_by VARCHAR(30),
  updated_date DATE,
  updated_by VARCHAR(30),
  
  CONSTRAINT pk_student_id PRIMARY KEY (student_id),
  CONSTRAINT fk_student_program_id FOREIGN KEY (program_id) REFERENCES program(program_id) ON DELETE CASCADE, 
  CONSTRAINT fk_student_batch_id FOREIGN KEY (batch_id) REFERENCES batch(batch_id) ON DELETE CASCADE
);

CREATE TABLE evaluation_name (
    evaluation_id INT AUTO_INCREMENT,
    course_id INT DEFAULT NULL,
    teacher_id INT DEFAULT NULL,
    batch_id INT DEFAULT NULL,
    student_id INT DEFAULT NULL,
    type VARCHAR(20),
    submission_date DATETIME,
    evaluation_name VARCHAR(20),
    total_marks INT,
    marks_secured INT,
    created_date DATE,
    created_by VARCHAR(30),
    updated_date DATE,
    updated_by VARCHAR(30),
    
    CONSTRAINT pk_evaluation_id PRIMARY KEY (evaluation_id),
    CONSTRAINT fk_evaluation_name_course_id FOREIGN KEY (course_id) REFERENCES course (course_id) ON DELETE CASCADE,
    CONSTRAINT fk_evaluation_name_teacher_id FOREIGN KEY (teacher_id) REFERENCES teacher (teacher_id) ON DELETE CASCADE,
    CONSTRAINT fk_evaluation_name_batch_id FOREIGN KEY (batch_id) REFERENCES batch (batch_id) ON DELETE CASCADE,
    CONSTRAINT fk_evaluation_name_student_id FOREIGN KEY (student_id) REFERENCES student (student_id) ON DELETE CASCADE
);

CREATE TABLE attendance (
    attendace_id INT AUTO_INCREMENT,
    student_id INT DEFAULT NULL,
    date DATE,
    topic_id INT DEFAULT NULL,
    teacher_id INT DEFAULT NULL,
    batch_id INT DEFAULT NULL,
    attendance BIT,
    created_date DATE,
    created_by VARCHAR(30),
    updated_date DATE,
    updated_by VARCHAR(30),
    
    CONSTRAINT pk_attendace_id PRIMARY KEY (attendace_id),
    CONSTRAINT fk_attendance_student_id FOREIGN KEY (student_id) REFERENCES student (student_id) ON DELETE CASCADE,
    CONSTRAINT fk_attendance_topic_id FOREIGN KEY (topic_id) REFERENCES topic (topic_id) ON DELETE CASCADE,
    CONSTRAINT fk_attendance_teacher_id FOREIGN KEY (teacher_id) REFERENCES teacher (teacher_id) ON DELETE CASCADE,
    CONSTRAINT fk_attendance_batch_id FOREIGN KEY (batch_id) REFERENCES batch (batch_id) ON DELETE CASCADE
);

ALTER TABLE batch
ADD teacher_course_id INT,
ADD CONSTRAINT fk_batch_teacher_course
FOREIGN KEY (teacher_course_id) REFERENCES teacher_course (teacher_course_id) ON DELETE CASCADE ON UPDATE CASCADE;

select * from attendance;
select * from batch;
select * from program;
select * from course;
select * from topic;
select * from teacher;
select * from teacher_course;
select * from student;
select * from credentials;
select * from batch_teacher_course;
select * from evaluation_name;