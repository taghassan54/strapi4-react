import {useStrapi} from "./runtime/useStrapi";
import {strapiConfig} from "./runtime/config/strapiConfig"
/*
* ufo
* axios
* qs
*  */

export * from "./runtime/types"
export * from "./runtime/composables";
export {
    useStrapi,
    strapiConfig
}
export default useStrapi
