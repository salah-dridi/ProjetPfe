import axios from "axios";
const [userType, setUserType] = useState(null);

const setErrorMessage = (errorMessage) => {
  // Implement the logic to handle the error message
  console.error(errorMessage);
};

const handleLogin = async (userType) => {
    try {
      let loginEndpoint = "";
      
      if (userType === "citoyen") {
        loginEndpoint = "http://localhost:8080/citoyen/logincitoyen";
      } else if (userType === "locataire") {
        loginEndpoint = "http://localhost:8080/locataire/loginlocataire";
      }
       else {
        // Handle unsupported user type (agent) 
        console.log('hello')
        return;
      }
      // Send a POST request to the corresponding login endpoint
      const response = await axios.post(loginEndpoint, {
        email: email,
        password: password,
      });

      // if the server returns the user data
      const user = response.data;

      // Redirect to the appropriate screen based on the user type
      if (userType === "citoyen") {
        console.log('citoyen')
        navigation.navigate("ProductList", { user });        
      } else if (userType === "locataire") {
        navigation.navigate("LocataireScreen", { user });
      }
    } catch (error) {
      // Handle login error and display appropriate error message
      setErrorMessage("Authentication failed");
    }
  };




  ///////////////////


  const getUserTypeFromURL = (url) => {
    if (url.includes("/citoyen/logincitoyen")) {
      return "citoyen";
    } else if (url.includes("/locataire/loginlocataire")) {
      return "locataire";
    } else {
      return "unknown";
    }
  };
  const handleLoginé = async (loginEndpoint) => {
    try {
      const response = await axios.post(loginEndpoint, {
        email: email,
        password: password,
      });
  
      const user = response.data;
  
      // Determine the user type based on the login endpoint
      const userType = getUserTypeFromURL(loginEndpoint);
  
      if (userType === "citoyen") {
        navigation.navigate("CitoyenScreen", { user });
      } else if (userType === "locataire") {
        navigation.navigate("LocataireScreen", { user });
      } else {
        console.log("Unknown user type");
      }
    } catch (error) {
      setErrorMessage("Authentication failed");
    }
  };




  const handleLoginb = async (userType, credentials) => {
    let loginUrl;
    
    switch (userType) {
      // case 'Agent':
      //   loginUrl = '/agents/login';
      //   break;
      case 'Locataire':
        loginUrl = '/locataire/loginlocataire';
        break;
      case 'Citoyen':
        loginUrl = '/citoyen/logincitoyen';
        break;
      default:
        // Handle invalid user type
        return;
    }
  
    try {
      const response = await axios.post(loginUrl, credentials);
      const { accessToken } = response.data; //the server sends an access token
  
      // Store the access token in AsyncStorage or Redux store for future API requests
  
      // Redirect the user to their specific screen based on userType
      switch (userType) {
        // case 'Agent':
        //   // Redirect to Agent screen
        //   break;
        case 'Locataire':
          // Redirect to Locataire screen
          break;
        case 'Citoyen':
          // Redirect to Citoyen screen
          break;
        default:
          // Handle invalid user type
          break;
      }
    } catch (error) {
      // Handle login error
    }
  };
