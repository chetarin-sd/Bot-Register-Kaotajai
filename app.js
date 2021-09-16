const axios = require("axios");
const FormData = require("form-data");
const xlsxFile = require("read-excel-file/node");

const register_kaotajai = async (user) => {
  try {

    let weight = user[12];
    let height = user[13];

    // if(user[4] == "M"){
    //     height = getRandomInt(160,170)
    //     weight = getRandomInt(55,65)
    // }else {
    //     height = getRandomInt(155,165)
    //     weight = getRandomInt(50,60)
    // }

    let bodyFormData = new FormData();
    bodyFormData.append("file", "");
    bodyFormData.append(
      "form",
      `{"type_id":"${user[5]}","username":"${user[0]}","password":"${user[0]}","gender":"${user[4]}","identify_number":"${user[1]}","first_name":"${user[2]}","last_name":"${user[3]}","height":"${height}","weight":"${weight}","current_address":"${user[6]}","current_moo":"${user[7]}","current_p_code":"${user[8]}","current_a_code":"${user[9]}","current_t_code":"${user[10]}","current_postcode":"${user[11]}","activate":"1","avatar_type":"s3"}`
    );

    return await axios.post(
      "https://kaotajai.com/api/v1/backend/users/register",
      bodyFormData,
      { headers: {
        'Content-Type': `multipart/form-data; boundary=${bodyFormData.getBoundary()}`,
        'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36 Edg/93.0.961.44`,
        'origin': `https://www.kaotajai.com`,
        'referer': `https://www.kaotajai.com/`
      }}
    );
  } catch (error) {
    return error.response.data;
  }
}

const getRandomInt = (from,to) => {
  return Math.floor(Math.random() * to) + from;
}

const app = async () => {
    let users = await xlsxFile("./data/users-test.xlsx")

    let i = 0;
    let countAll = users.length - 1
    let countSuccess = 0
    let countFail = 0

    for (let i = 1; i < users.length; i++) {
      let user = users[i]
      const post_regis = await register_kaotajai(user);
      if(post_regis.status == 200){
        countSuccess++
      }else{
        console.log(post_regis.message);
        countFail++
      }
      // console.log(user);
    }
    console.log("Count All",countAll);
    console.log("Count Success",countSuccess);
    console.log("Count Fail",countFail);
}

app();
