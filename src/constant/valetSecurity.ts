export enum ValetSecurityEnum {
  Security = 'security',
  Valet = 'valet',
}

export type ValetSecurityType =
  | ValetSecurityEnum.Security
  | ValetSecurityEnum.Valet
export const VALET_SECURITY_TYPE_DROPDOWN = [
  {
    label: 'Security',
    value: ValetSecurityEnum.Security,
  },
  {
    label: 'Valet',
    value: ValetSecurityEnum.Valet,
  },
]
