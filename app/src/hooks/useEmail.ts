export default function useEmail(email: string, required: boolean) {
    
    if(required && !email) {
        return 'Email is required'
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return 'Email is invalid'
    }

    return ''
}