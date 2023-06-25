type SelectItem = {
    label : string
    value : string
}

type SelectProps = {
    data : SelectItem[]
    placeHolder : string
    name : string
    selected? : string | SelectItem
}