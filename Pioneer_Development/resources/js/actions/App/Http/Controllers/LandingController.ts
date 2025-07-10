import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LandingController::index
 * @see app/Http/Controllers/LandingController.php:20
 * @route '/'
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/',
}

/**
* @see \App\Http\Controllers\LandingController::index
 * @see app/Http/Controllers/LandingController.php:20
 * @route '/'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LandingController::index
 * @see app/Http/Controllers/LandingController.php:20
 * @route '/'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LandingController::index
 * @see app/Http/Controllers/LandingController.php:20
 * @route '/'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LandingController::storeContact
 * @see app/Http/Controllers/LandingController.php:79
 * @route '/contact'
 */
export const storeContact = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storeContact.url(options),
    method: 'post',
})

storeContact.definition = {
    methods: ['post'],
    url: '/contact',
}

/**
* @see \App\Http\Controllers\LandingController::storeContact
 * @see app/Http/Controllers/LandingController.php:79
 * @route '/contact'
 */
storeContact.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return storeContact.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LandingController::storeContact
 * @see app/Http/Controllers/LandingController.php:79
 * @route '/contact'
 */
storeContact.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storeContact.url(options),
    method: 'post',
})
const LandingController = { index, storeContact }

export default LandingController