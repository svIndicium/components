export enum RadioButtonGroupDirection {
    VERTICAL = "VERTICAL",
    HORIZONTAL = "HORIZONTAL"
}

export interface OptionModel<T = any> {
    translationKey: string
    value: T
    disabled?: boolean
}
