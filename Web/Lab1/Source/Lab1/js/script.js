function Course(career, subject, number, name, semesters, instructor, hours, description, prerequisites, times, rooms, seats, reviews) {
    this.career = career;
    this.subject = subject;
    this.number = number;
    this.name = name;
    this.semesters = semesters;
    this.instructor = instructor;
    this.hours = hours;
    this.description = description;
    this.prerequisites = prerequisites;
    this.times = times;
    this.rooms = rooms;
    this.seats = seats;
    this.remaining = this.seats;
    this.reviews = reviews;
    this.enroll = function (semester) {
        for (i = 0; i < this.remaining.length; i++) {
            if (this.remaining.semester == semester) {
                this.remaining.seats--;
            }
        }
    }
}

var anthro103 = new Course("undergraduate", "anthropology", "ANTHRO103", "Introduction to Cultural Anthropology",
    ["fall2018", "spring2019"], "Jefferey Bennett", 3,
    "An introduction to culture and the basic concepts of anthropology.  Topics include kinship, language, and cultural change.",
    "", [{semester:"fall2018", time:"Mo 5:30PM-8:15PM"}, {semester:"spring2019", time:"TuTh 8:30AM-9:45AM"}],
    [{semester:"fall2018", room:"Haag Hall-201"}, {semester:"spring2019", room:"Haag Hall-315"}],
    [{semester:"fall2018", seats:50}, {semester:"spring2019", seats:50}],
    [{reviewer:"anthrostudent", rating:4, review:"Class is easy. Don't buy the book"},
        {reviewer:"slacker", rating:2, review:"This class stinks, boring"},
        {reviewer:"anthro2", rating:5, review:"I loved this class, can't wait to be an anthropologist!"}]);

var anthro300 = new Course("undergraduate", "anthropology", "ANTHRO300", "Special Topics in Anthropology ",
    ["fall2018", "summer2018"], "Shannon Jackson", 3,
    "Each time this course is offered, a different area of anthropology, to be announced, will be examined.",
    "", [{semester:"fall2018", time:"MoWeFr 1:00PM-1:50PM"}, {semester:"summer2018", time:"TuTh 2:30AM-5:30PM"}],
    [{semester:"fall2018", room:"TBA"}, {semester:"summer2018", room:"Internet Class"}],
    [{semester:"fall2018", seats:30}, {semester:"summer2018", seats:30}],
    [{reviewer:"RachelGreen", rating:5, review:"Class was an amazing, challenging, enlightening course viewing the layering of societies throughout history, ethnographies, and Wall Street."},
        {reviewer:"autobots", rating:3, review:"Get ready to read"},
        {reviewer:"zoomer", rating:4, review:"If you go to class, pay attention, and do the readings."}]);

var anthro322 = new Course("undergraduate", "anthropology", "ANTHRO322", "Race And Ethnic Relations",
    ["summer2018", "spring2019"], "Ann Wood", 3,
    "The nature, origin and dynamics of ethnic and race relations in the U. S. and other societies.",
    "SOCIOL 322", [{semester:"summer2018", time:"TuTh 10:00AM - 1:00PM"}, {semester:"spring2019", time:"MoWe 11:00AM - 11:50AM"}],
    [{semester:"summer2018", room:"Bloch-Rm 00002"}, {semester:"spring2019", room:"Bloch-Rm 00102"}],
    [{semester:"fall2summer2018018", seats:36}, {semester:"spring2019", seats:36}],
    [{reviewer:"pirateking", rating:1, review:"Class is very outdated"},
        {reviewer:"spider", rating:5, review:"Class is fantastic"},
        {reviewer:"chainbreaker", rating:5, review:"This class is easy."}]);

var anthro402 = new Course("undergraduate", "anthropology", "ANTHRO402", "Introduction to Cultural Anthropology",
    ["fall2018", "spring2019"], "Jefferey Bennett", 3,
    "An introduction to culture and the basic concepts of anthropology.  Topics include kinship, language, and cultural change.",
    "", [{semester:"fall2018", time:"Mo 5:30PM-8:15PM"}, {semester:"spring2019", time:"TuTh 8:30AM-9:45AM"}],
    [{semester:"fall2018", room:"Haag Hall-201"}, {semester:"spring2019", room:"Haag Hall-315"}],
    [{semester:"fall2018", seats:50}, {semester:"spring2019", seats:50}],
    [{reviewer:"anthrostudent", rating:4, review:"Class is easy. Don't buy the book"},
        {reviewer:"slacker", rating:2, review:"This class stinks, boring"},
        {reviewer:"anthro2", rating:5, review:"I loved this class, can't wait to be an anthropologist!"}]);

var anthro586 = new Course("graduate", "anthropology", "ANTHRO586", "Introduction to Prehistoric and Classical Archaeology",
    ["fall2018", "spring2019"], "Ann Raab", 3,
    "An introduction to archaeological research methods that traces human origins and cultural development from the earliest fossil evidence to the threshold of written history and civilization.",
    "ANTHRO103", [{semester:"fall2018", time:"MoWe 5:30PM-8:15PM"}, {semester:"spring2019", time:"TuTh 9:30AM-10:45AM"}],
    [{semester:"fall2018", room:"Internet Class"}, {semester:"spring2019", room:"Internet Class"}],
    [{semester:"fall2018", seats:30}, {semester:"spring2019", seats:30}],
    [{reviewer:"ross", rating:5, review:"Class is very straight forward & easy to follow"},
        {reviewer:"tim2233", rating:3, review:"Too much work for an elective course"},
        {reviewer:"anthro2", rating:4, review:"Read the syllabus and go by it"}]);


var biology102 = new Course("undergraduate", "biology", "biology102", "Biology and Living",
    ["summer2018", "fall2018"], "Floyd Likins", 3,
    "Introduction to structural organization and functional processes of living systems.",
    "BIOLOGY H498WI", [{semester:"summer2018", time:"Mo 5:30PM-8:15PM"}, {semester:"fall2018", time:"MoWeFr 9:00AM - 9:50AM"}],
    [{semester:"summer2018", room:"Education-Rm 00119"}, {semester:"fall2018", room:"Education-Rm 0019"}],
    [{semester:"summer2018", seats:60}, {semester:"fall2018", seats:60}],
    [{reviewer:"ika", rating:4, review:"Grading is straight forward. Based on midterm and final."},
        {reviewer:"KC", rating:5, review:"6 hw assignments that are not mandatory"},
        {reviewer:"sam12", rating:5, review:"So there are 6 assignments which optional but they are very useful in doing the midterm and the final."}]);

var biology108 = new Course("undergraduate", "biology", "biology108", "General Biology I",
    ["fall2018", "spring2019"], "Marilyn Yoder", 3,
    "Fundamental studies in biology emphasizing the unity and diversity of life.",
    "biology 102", [{semester:"fall2018", time:"WeFr 9:00AM - 9:50AM"}, {semester:"spring2019", time:"TuTh 9:30AM-10:45AM"}],
    [{semester:"fall2018", room:"MNLC-Rm 151"}, {semester:"spring2019", room:"MNLC-Rm 251"}],
    [{semester:"fall2018", seats:260}, {semester:"spring2019", seats:260}],
    [{reviewer:"uni", rating:1, review:"Lectures were useless and homework was on material we hadn't covered yet."},
        {reviewer:"pam", rating:3, review:"Class is incredibly lecture heavy"},
        {reviewer:"ann", rating:5, review:"I found this class to lack structure and organization."}]);

var biology5519 = new Course("graduate", "biology", "biology5519", "Principles of Evolution",
    ["summer2018", "spring2019"], "Rachael Allen", 3,
    "Synthesis of the modern concepts of evolution. Discussion of the biological processes that produce organic diversity through phyletic change.",
    "BIOLOGY 206", [{semester:"summer2018", time:"MoWeFr 10:00AM - 10:50AM"}, {semester:"spring2019", time:"WeFr 10:00AM - 11:15AM"}],
    [{semester:"summer2018", room:"Education-Rm 00119"}, {semester:"spring2019", room:"Education-Rm 00101"}],
    [{semester:"summer2018", seats:67}, {semester:"spring2019", seats:67}],
    [{reviewer:"karen", rating:1, review:"This is the hardest class I have ever taken and not for good reasons."},
        {reviewer:"lora", rating:2, review:"You will not get most of the questions on exams if you don't listen to the little details in class."},
        {reviewer:"mike", rating:3, review:"The tests are just long and ask about everything for no reason."}]);

var biology5592 = new Course("graduate", "biology", "biology5592", " Master of Arts Topics in Biology",
    ["fall2018", "spring2019"], "Karen Bame", 3,
    "Special problems and topics in biology specifically intended to satisfy the project or report requirement for the master of arts degree in biology.",
    "Nine hours of graduate work in Biology.", [{semester:"fall2018", time:"TBA"}, {semester:"spring2019", time:"TBA"}],
    [{semester:"fall2018", room:"Arranged"}, {semester:"spring2019", room:"Arranged"}],
    [{semester:"fall2018", seats:30}, {semester:"spring2019", seats:30}],
    [{reviewer:"fiona", rating:5, review:"You only need the book for the exercises online."},
        {reviewer:"dim", rating:4, review:"Be sure to attend classes for quizzes"},
        {reviewer:"nicole", rating:4, review:"Tests are hard"}]);

var compsci101 = new Course("undergraduate", "cs", "compsci101", "Problem Solving and Programming I",
    ["fall2018", "spring2019"], "Kendall Bingham", 3,
    "Problem solving, algorithms, and program design. Use of structured programming, lists, control structures, recursion, objects and files in Python.",
    "MATH 110", [{semester:"fall2018", time:"TuTh 5:30PM - 6:45PM"}, {semester:"spring2019", time:"TuTh 1:00PM - 2:15PM"}],
    [{semester:"fall2018", room:"Flarsheim Hall-Rm 00457"}, {semester:"spring2019", room:"Flarsheim Hall-Rm 00457"}],
    [{semester:"fall2018", seats:30}, {semester:"spring2019", seats:30}],
    [{reviewer:"spencer", rating:1, review:"The assignments were things that you need to spend large amounts of time doing."},
        {reviewer:"jerrod", rating:3, review:"Lectures are not structured and he easily gets off topic."},
        {reviewer:"chris", rating:5, review:"Projects and exams were extremely fair."}]);

var compsci303 = new Course("undergraduate", "cs", "compsci303", "Data Structures",
    ["summer2018", "fall2018"], "Mohammad Amin Kuhail", 3,
    "Linear and hierarchical data structures, including stacks, queues, lists, trees, priority queues, advanced tree structures, hashing tables, dictionaries and disjoint-set.",
    "COMP-SCI 191, COMP-SCI 201R", [{semester:"fall2018", time:"TuTh 10:00AM - 1:15PM"}, {semester:"fall2018", time:"TuTh 10:00AM - 11:15AM"}],
    [{semester:"summer2018", room:"Flarsheim Hall-Rm 00457"}, {semester:"fall2018", room:"TBA"}],
    [{semester:"summer2018", seats:60}, {semester:"fall2018", seats:60}],
    [{reviewer:"sam", rating:1, review:"Very clear lectures."},
        {reviewer:"adam", rating:3, review:"This class DOES require you to know C++, as it is heavy in data structure implementation."},
        {reviewer:"michaela", rating:5, review:"Quzes are extra credit (10%), 2 projects (40%), 5 assignments worst one gets dropped (20%), 2 exams (40%)."}]);

var compsci5525 = new Course("graduate", "cs", "compsci5525", "Cloud Computing",
    ["fall2018", "spring2019"], "Baek-Young Choi", 3,
    "Cloud computing systems operate in a very large scale, and are impacting the economics and the assumptions behind computing significantly.",
    "CSEE 5110, COMP-SCI 431", [{semester:"fall2018", time:"MoWe 5:30PM - 6:45PM"}, {semester:"spring2019", time:"TuTh 3:00PM - 4:15PM"}],
    [{semester:"fall2018", room:"Haag Hall-Rm 00312"}, {semester:"spring2019", room:"Flarsheim Hall-Rm 00457"}],
    [{semester:"fall2018", seats:30}, {semester:"spring2019", seats:30}],
    [{reviewer:"avan", rating:4, review:"Start early on your homework and projects!"},
        {reviewer:"tom", rating:4, review:"You can learn this course on your own if you know how to google and find respective youtube videos."},
        {reviewer:"julia", rating:5, review:"Good class."}]);

var compsci5551 = new Course("graduate", "cs", "compsci5551", "Advanced Software Engineering",
    ["fall2018", "spring2019"], "Yugyung Lee", 3,
    "Current concepts in software architecture and design, comparative analysis for design, object-oriented software design, software quality criteria for evaluation of software design.",
    "COMP-SCI 451R", [{semester:"fall2018", time:"TuTh 5:30PM - 6:45PM"}, {semester:"spring2019", time:"TuTh 5:30PM - 6:45PM "}],
    [{semester:"fall2018", room:"TBA"}, {semester:"spring2019", room:"TBA"}],
    [{semester:"fall2018", seats:40}, {semester:"spring2019", seats:40}],
    [{reviewer:"avan", rating:4, review:"You are supposed to create a mobile application that reads tweets and save them into Hadoop."},
        {reviewer:"tom", rating:3, review:"Too much workload"},
        {reviewer:"julia", rating:5, review:"Extremely helpful."}]);

var history102 = new Course("undergraduate", "history", "history102", "U.S. History Since 187",
    ["summer2018", "spring2019"], "Rebecca Davis", 3,
    "This course offers a broad survey of American history up to 1877.",
    "", [{semester:"summer2018", time:"MoWe 1:00PM - 1:50PM"}, {semester:"spring2019", time:"We 11:00AM - 11:50AM"}],
    [{semester:"summer2018", room:"MNLC-Rm 451"}, {semester:"spring2019", room:"Education-Rm 00260"}],
    [{semester:"summer2018", seats:120}, {semester:"spring2019", seats:120}],
    [{reviewer:"pirat", rating:4, review:"Use book for online quizzes."},
        {reviewer:"lola", rating:4, review:"Lots of things to be graded on, but not a huge amount of homework."},
        {reviewer:"zara", rating:5, review:"I did not read the main textbook for the class, however the lecture was important for the breakout session."}]);

var history206 = new Course("undergraduate", "history", "history206", "World History To 1450",
    ["summer2018", "spring2019"], "William Ashworth", 3,
    "This course surveys the cultural, social, economic, and political history of the world to 1450.",
    "", [{semester:"summer2018", time:"MoWe 11:00AM - 11:50AM"}, {semester:"spring2019", time:"Fr 11:00AM - 11:50AM"}],
    [{semester:"summer2018", room:"Education-Rm 00033"}, {semester:"spring2019", room:"Education-Rm 00033"}],
    [{semester:"summer2018", seats:60}, {semester:"spring2019", seats:60}],
    [{reviewer:"pirat", rating:5, review:"You can get an A in this course without using the book because all the information you need can be found in lectures."},
        {reviewer:"lola", rating:3, review:"Only 1 person in the class gets a 15/15."},
        {reviewer:"zara", rating:5, review:"I only took this class because I registered last minute and needed something to fulfill a history general elective."}]);

var history5501a = new Course("graduate", "history", "history5501a", "Religion in America",
    ["fall2018", "spring2019"], "Gary Ebersole", 3,
    "An in-depth examination of selected aspects of the history of religions in America from the colonial period to the present.",
    "", [{semester:"summer2018", time:"We 5:30PM - 8:15PM"}, {semester:"spring2019", time:"We 5:30PM - 8:15PM"}],
    [{semester:"fall2018", room:"Haag Hall-Rm 00307"}, {semester:"spring2019", room:"Haag Hall-Rm 00307"}],
    [{semester:"fall2018", seats:35}, {semester:"spring2019", seats:35}],
    [{reviewer:"redhat", rating:5, review:"If you pay attention in class and take notes you will get an A."},
        {reviewer:"new123", rating:4, review:"Very helpful class"},
        {reviewer:"zooba", rating:3, review:"DO NOT BUY A TEXTBOOK!"}]);

var history5513 = new Course("graduate", "history", "history5513", "Renaissance",
    ["summer2018", "spring2019"], "David Freeman", 3,
    "Renaissance - covering the span between the 14th and 17th centuries.",
    "HISTORY 413", [{semester:"summer2018", time:"TuTh 2:30PM - 3:45PM"}, {semester:"spring2019", time:"TuTh 10:00AM - 11:15AM"}],
    [{semester:"summer2018", room:"Haag Hall-Rm 00307"}, {semester:"spring2019", room:"Internet Class"}],
    [{semester:"summer2018", seats:35}, {semester:"spring2019", seats:35}],
    [{reviewer:"umar", rating:5, review:"If you complete the readings and study your notes prior to the tests you will do well."},
        {reviewer:"smart", rating:5, review:"Definitely my favourite."},
        {reviewer:"aska", rating:5, review:"Highly recommend taking a class."}]);

var math109 = new Course("undergraduate", "math", "math109", "Precalculus Algebra Fundamentals",
    ["summer2018", "spring2019"], "Kristin Kathman", 3,
    "Fundamental topics and skills that are necessary for success in MATH 110 will be developed in close alignment with the material covered.",
    "MATH 110", [{semester:"summer2018", time:"TuTh 9:00AM - 9:50AM"}, {semester:"spring2019", time:"TuTh 1:00PM - 1:50PM"}],
    [{semester:"summer2018", room:"Miller Nichols Library -Rm 422"}, {semester:"spring2019", room:"Education-Rm 00133"}],
    [{semester:"summer2018", seats:41}, {semester:"spring2019", seats:41}],
    [{reviewer:"pirat", rating:5, review:"I have always struggled with trig but her teaching style makes the material seem easy and understandable."},
        {reviewer:"lola", rating:5, review:"Personally, this was the easiest math class I've ever taken and I got an A with no issues."},
        {reviewer:"zara", rating:5, review:"Highly recommended if you care for your grades."}]);

var math116 = new Course("undergraduate", "math", "math116", "Mathematics For Liberal Arts",
    ["fall2018", "spring2019"], "Stephanie Van Rhein", 3,
    "This course is only for those   students whose programs require no   further mathematics courses\n",
    "Three units of high school math", [{semester:"fall2018", time:"WeFr 9:00AM - 10:15AM"}, {semester:"spring2019", time:"WeFr 10:35AM - 11:50AM"}],
    [{semester:"fall2018", room:"Internet Class"}, {semester:"spring2019", room:"Internet Class"}],
    [{semester:"fall2018", seats:30}, {semester:"spring2019", seats:30}],
    [{reviewer:"mac", rating:5, review:"All the exams can be viewed and done from the first day."},
        {reviewer:"qt555", rating:4, review:"You can take both infinitely and take exams twice."},
        {reviewer:"stephq", rating:5, review:"Online class requires a little lot of homework every week"}]);

var math5509 = new Course("graduate", "math", "math5509", "General Algebra I",
    ["summer2018", "spring2019"], "Liana Sega", 3,
    "Groups, rings, modules, homology, fields and Galois theory, valuations, matrices, and multilinear algebra.",
    "MATH 410, MATH 420", [{semester:"summer2018", time:"MoWeFr 2:00PM - 2:50PM"}, {semester:"spring2019", time:"MoWe 4:00PM - 5:15PM"}],
    [{semester:"summer2018", room:"Royall Hall-Rm 00102"}, {semester:"spring2019", room:"Royall Hall-Rm 00205"}],
    [{semester:"summer2018", seats:18}, {semester:"spring2019", seats:18}],
    [{reviewer:"pirat", rating:5, review:"Just one word Amazing."},
        {reviewer:"lola", rating:4, review:"It takes a bit of reading and understanding examples in class to do the homework and well on tests."},
        {reviewer:"zara", rating:5, review:"Work hard and show up; you'll get an A!"}]);

var math5513 = new Course("graduate", "math", "math5513", "Real Variables I",
    ["summer2018", "spring2019"], "Noah Rhee", 3,
    "Theory of measure with applications to analysis. Riemann and Lebesgue integration.",
    "Math 402", [{semester:"summer2018", time:"TuTh 9:00AM - 9:50AM"}, {semester:"spring2019", time:"MoWeFr 2:00PM - 2:50PM"}],
    [{semester:"summer2018", room:"Royall Hall-Rm 00205"}, {semester:"spring2019", room:"Royall Hall-Rm 00102"}],
    [{semester:"summer2018", seats:18}, {semester:"spring2019", seats:18}],
    [{reviewer:"john", rating:3, review:"Yes, you have to go to class if you want to pass BUT that's only because he works out almost all of the homework problems."},
        {reviewer:"leyla", rating:4, review:"If you can teach yourself, you can easily pass the class."},
        {reviewer:"paul", rating:4, review:"Basically homework is everything"}]);

var career = "";
var subject = "";
var semester = "";
var courses = [anthro103];

function search() {
    career = document.getElementById("select-career").value;
    subject = document.getElementById("select-subject").value;
    semester = document.getElementById("select-semester").value;

    return getResults(career, subject, semester);
}

function getResults(career, subject, semester) {
    var results = [];
    for (var i = 0; i < courses.length; i++) {
        if (courses[i].career == career && courses[i].subject == subject) {
            for (var j = 0; j < courses[i].semesters.length; j++) {
                if (courses[i].semesters[j] == semester) {
                    results.push(courses[i]);
                }
            }
        }
    }
    return results;
}






