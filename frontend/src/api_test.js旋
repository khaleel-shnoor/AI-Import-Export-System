// Shnoor International - Connection Tester
const BACKEND_URL = "http://127.0.0.1:8000/api/v1";

export const testBackendConnection = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/shipments/track/SHN-TEST`);
        const data = await response.json();
        console.log("✅ Shnoor Backend Connected!", data);
        return data;
    } catch (error) {
        console.error("❌ Connection failed. Is the backend running?", error);
    }
};
