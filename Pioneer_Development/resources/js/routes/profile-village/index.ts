import { queryParams, type QueryParams } from './../../wayfinder'

/**
* @see \App\Http\Controllers\ProfileVillageController::edit
 * @see app/Http/Controllers/ProfileVillageController.php:22
 * @route '/profile-village/edit'
 */
export const edit = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/profile-village/edit',
}

/**
* @see \App\Http\Controllers\ProfileVillageController::edit
 * @see app/Http/Controllers/ProfileVillageController.php:22
 * @route '/profile-village/edit'
 */
edit.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileVillageController::edit
 * @see app/Http/Controllers/ProfileVillageController.php:22
 * @route '/profile-village/edit'
 */
edit.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProfileVillageController::edit
 * @see app/Http/Controllers/ProfileVillageController.php:22
 * @route '/profile-village/edit'
 */
edit.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProfileVillageController::storeOrUpdate
 * @see app/Http/Controllers/ProfileVillageController.php:41
 * @route '/profile-village'
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
    url: '/profile-village',
}

/**
* @see \App\Http\Controllers\ProfileVillageController::storeOrUpdate
 * @see app/Http/Controllers/ProfileVillageController.php:41
 * @route '/profile-village'
 */
storeOrUpdate.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return storeOrUpdate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileVillageController::storeOrUpdate
 * @see app/Http/Controllers/ProfileVillageController.php:41
 * @route '/profile-village'
 */
storeOrUpdate.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storeOrUpdate.url(options),
    method: 'post',
})
const profileVillage = {
    edit,
storeOrUpdate,
}

export default profileVillage