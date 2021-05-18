const returnObj = (failed, helpText) => ({failed: failed, helperText: helpText})

// const length = (min, max) => function(val, min, max)
export const length = (min, max = undefined) => {
    return (val) => {
        if (max) {
            return returnObj(val.length < min || val.length > max, `Field must have between ${min} and ${max} characters`)
        }
        else if (val.length < min) {
            return returnObj(true, `Field must have at least ${min} characters`)
        }
        return returnObj(false, "")
    }
}

export const required = (val) => {
    const failed = returnObj(true, "Field required")
    const passed = returnObj(false, "")
    switch (val) {
        case undefined:
            return failed
        case null:
            return failed
        case "": 
            return failed
        case []:
            return failed
        case {}:
            return failed
        default:
            return passed
    }
}
