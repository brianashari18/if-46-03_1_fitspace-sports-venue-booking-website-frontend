import axios from "axios";

const login = async (url) => {
    try {
        return await axios.get(
            url
        );
    } catch (error) {
        console.error("Error during Google callback handling:", error);
    }
}

export default {
    login
}