import { queryParams, type QueryParams } from './../../../wayfinder'

/**
* @see \App\Http\Controllers\ProfileVillageController::show
 * @see app/Http/Controllers/ProfileVillageController.php:22
 * @route '/profil-desa'
 */
export const show = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/profil-desa',
}

/**
* @see \App\Http\Controllers\ProfileVillageController::show
 * @see app/Http/Controllers/ProfileVillageController.php:22
 * @route '/profil-desa'
 */
show.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileVillageController::show
 * @see app/Http/Controllers/ProfileVillageController.php:22
 * @route '/profil-desa'
 */
show.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProfileVillageController::show
 * @see app/Http/Controllers/ProfileVillageController.php:22
 * @route '/profil-desa'
 */
show.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(options),
    method: 'head',
})
const profileVillage = {
    show,
}

export default profileVillage