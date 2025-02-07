import { SubMenu, subMenusComercial, subMenusContabilidade, subMenusDiretoria, subMenusFaturamento, subMenusFinanceiro, subMenusOperacional, subMenusRH, subMenusTI } from "./Submenu";

export const Menus: Menu[] = [
    {menu: "ti",label: "Tecnologia da Informação"},
    {menu: "comercial",label: "Comercial"},
    {menu: "operacional",label: "Operacional"},
    {menu: "rh",label: "Recursos Humanos"},
    {menu: "financeiro",label: "Financeiro"},
    {menu: "faturamento",label: "Faturamento"},
    {menu: "contabilidade",label: "Contabilidade"},
    {menu: "diretoria",label: "Diretoria"}
]
export interface Menu {
    menu:string,
    label: string
}

export const menuToSubMenuMap: Record<string, SubMenu[]> = {
    ti: subMenusTI,
    comercial: subMenusComercial,
    operacional: subMenusOperacional,
    rh: subMenusRH,
    financeiro: subMenusFinanceiro,
    faturamento: subMenusFaturamento,
    contabilidade: subMenusContabilidade,
    diretoria: subMenusDiretoria,
  };