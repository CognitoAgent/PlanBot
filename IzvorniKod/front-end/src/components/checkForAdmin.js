function checkForAdmin(){
  //provjera je li korisnik prijavljen
    const token=sessionStorage.getItem('token');
    if(token===null){
        window.location.replace('login');
    }
    fetch(
        "https://ec2-52-30-64-126.eu-west-1.compute.amazonaws.com:8443/admin",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )
      .then(response=>{
        //ako je korisnik admin šalje ga se na stranicu za admina
        if(response.ok){
            window.location.replace('adminview');
        }
        else{
          //ako nije admin ostaje na trenutnoj stranici
            if(response.status===400){
                alert("You are not an admin");
                return;
          
            }
            else{
                throw new Error("Something went wrong");
            }
        }
      })
      .catch(e=>alert(e.message));
}
export default checkForAdmin;