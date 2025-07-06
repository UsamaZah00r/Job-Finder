import axios from "axios"

export const getProfile = async () => {
  const response = await axios.get("http://localhost:8000/api/v1/user/me", {
    withCredentials: true,
  })
  return response.data
}
