import {useStrapi} from "./runtime/useStrapi";
import {strapiConfig} from "./runtime/config/strapiConfig"

import {useStrapiAuth} from "./runtime/composables/useStrapiAuth";
import {useStrapiUser} from "./runtime/composables/useStrapiUser";
import {useStrapiUrl} from "./runtime/composables/useStrapiUrl";
import {useStrapiVersion} from "./runtime/composables/useStrapiVersion";
import {useStrapiToken} from "./runtime/composables/useStrapiToken";
import {useStrapiClient} from "./runtime/composables/useStrapiClient";
import {useStrapiGraphQL} from "./runtime/composables/useStrapiGraphQL";
import {useStrapiMedia} from "./runtime/composables/useStrapiMedia";


/*
* ufo
* axios
* qs
*  */

export * from "./runtime/types"
export * from "./runtime/composables";
export {
    useStrapi,
    strapiConfig,
    useStrapiAuth,
    useStrapiUser,
    useStrapiUrl,
    useStrapiVersion,
    useStrapiToken,
    useStrapiClient,
    useStrapiGraphQL,
    useStrapiMedia
}
export default useStrapi
