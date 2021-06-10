class BlogAPI {
    constructor(channel) {
        this.channel = channel
        // TODO: Maybe also register a callback here to do something if there's an error
        // https://hexdocs.pm/phoenix/js/#channelonmessage
    }

    pushImage(file, hash) {
        // Copy file contents to new file object with a new name 
        const renamedImg = new File([file], `${hash}.png`)
        this.channel.push("image", renamedImg)
        .receive("ok", resp => console.log("pushed image successfully", resp))
        .receive("error", err => console.log("you done fucked up", err))
    }
}

export default BlogAPI