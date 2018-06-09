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
        {reviewer:"anthro2", rating:5, review:"I loved this class, can't wait to be an anthropologist!"}])

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






