import ApiService from "./ApiService";
class HelperService {
  static uploadFile = async (params) => {
      try {
        ApiService.setHeader();
        ApiService.setPostAsFile();
        const response = await ApiService.post(`files/upload`, params);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    };
    static getCountries = async (params = {}) => {
      try {
        ApiService.setHeader();
        const response = await ApiService.query(`countries`, {
            params
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    };
    
    static getOriginAreas = async (params ={}) => {
      try {
        ApiService.setHeader();
        const response = await ApiService.query(`origin-areas`, {
          params
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    };
  }

  
export default HelperService;