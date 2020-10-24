let user = function(name, dob, status, qual) 
{
    this.name = name;
    this.dob = dob;
    this.status = status;
    this.qual = qual;

    this.display = function()
    {
    console.log("Name:" + this.name);
    console.log("DOB:" + this.dob);
    console.log("Marital Status:" + this.status);
    console.log("Qualification:" + this.qual);
    }
}