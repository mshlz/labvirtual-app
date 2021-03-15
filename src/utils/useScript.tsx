export const useScript = script => {
    const doc = document.createElement('script')
    doc.innerHTML = script
    document.body.appendChild(doc)
}