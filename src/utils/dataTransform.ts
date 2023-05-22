


export const getPriceFormatted = (price: number) => {
    return price.toLocaleString("es-CL",{style:"currency" ,currency:"clp"})
}