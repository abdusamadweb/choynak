
// site language
export const lang = localStorage.getItem('lang') || 'en'
export const changeLang = (lang) => {
    localStorage.setItem('lang', lang)
    window.location.reload()
}


// format phone-number
export const formatPhone = (str) => {
    const mask = "+### (##) ### ## ##"
    if (!mask) return str
    const numeric = str?.replaceAll(/[^\d]/g, "")
    let idx = 0
    const formatted = mask?.split("").map((el) => {
        if (el === "#") {
            el = numeric[idx]
            idx++
        }
        return el
    })
    return formatted.join("")
}


// format price
const formatPrice = Intl.NumberFormat('de-RU')


// user-admin
const meData = localStorage.getItem('me')
export const me = JSON?.parse(meData)

// user-admin
const adminData = localStorage.getItem('userAdmin')
export const userAdmin = JSON?.parse(adminData)

