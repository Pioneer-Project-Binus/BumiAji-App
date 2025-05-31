import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\ProfileVillageController::storeOrUpdate
 * @see app\Http\Controllers\ProfileVillageController.php:44
 * @route /admin/profile-village
 */
export const storeOrUpdate = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storeOrUpdate.url(options),
    method: 'post',
})

storeOrUpdate.definition = {
    methods: ['post'],
    url: '\/admin\/profile-village',
}

/**
 * @see \App\Http\Controllers\ProfileVillageController::storeOrUpdate
 * @see app\Http\Controllers\ProfileVillageController.php:44
 * @route /admin/profile-village
 */
storeOrUpdate.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return storeOrUpdate.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ProfileVillageController::storeOrUpdate
 * @see app\Http\Controllers\ProfileVillageController.php:44
 * @route /admin/profile-village
 */
storeOrUpdate.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storeOrUpdate.url(options),
    method: 'post',
})


export default storeOrUpdate