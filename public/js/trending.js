// const content = "#javascript #new #happy"

const trending = (content) => {
    let trends = []
    let regex = /(#+[a-zA-Z0-9(_)]{1,})/
    if(content.includes("#")){
        let words = content.split(" ")
        for(let each of words){
            if(regex.test(each)) trends.push(each)
        }
    }
    return trends
}

// console.log(trending(content))

module.exports = {trending}