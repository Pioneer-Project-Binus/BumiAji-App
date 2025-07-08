import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProfileVillageController::indexPublic
 * @see app/Http/Controllers/ProfileVillageController.php:17
 * @route '/profil-desa'
 */
export const indexPublic = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexPublic.url(options),
    method: 'get',
})

indexPublic.definition = {
    methods: ['get','head'],
    url: '/profil-desa',
}

/**
* @see \App\Http\Controllers\ProfileVillageController::indexPublic
 * @see app/Http/Controllers/ProfileVillageController.php:17
 * @route '/profil-desa'
 */
indexPublic.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexPublic.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileVillageController::indexPublic
 * @see app/Http/Controllers/ProfileVillageController.php:17
 * @route '/profil-desa'
 */
indexPublic.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexPublic.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProfileVillageController::indexPublic
 * @see app/Http/Controllers/ProfileVillageController.php:17
 * @route '/profil-desa'
 */
indexPublic.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexPublic.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProfileVillageController::indexAdmin
 * @see app/Http/Controllers/ProfileVillageController.php:27
 * @route '/profile-village'
 */
export const indexAdmin = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexAdmin.url(options),
    method: 'get',
})

indexAdmin.definition = {
    methods: ['get','head'],
    url: '/profile-village',
}

/**
* @see \App\Http\Controllers\ProfileVillageController::indexAdmin
 * @see app/Http/Controllers/ProfileVillageController.php:27
 * @route '/profile-village'
 */
indexAdmin.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexAdmin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileVillageController::indexAdmin
 * @see app/Http/Controllers/ProfileVillageController.php:27
 * @route '/profile-village'
 */
indexAdmin.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexAdmin.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProfileVillageController::indexAdmin
 * @see app/Http/Controllers/ProfileVillageController.php:27
 * @route '/profile-village'
 */
indexAdmin.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexAdmin.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProfileVillageController::showOrCreate
 * @see app/Http/Controllers/ProfileVillageController.php:39
 * @route '/profile-village/edit'
 */
export const showOrCreate = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showOrCreate.url(options),
    method: 'get',
})

showOrCreate.definition = {
    methods: ['get','head'],
    url: '/profile-village/edit',
}

/**
* @see \App\Http\Controllers\ProfileVillageController::showOrCreate
 * @see app/Http/Controllers/ProfileVillageController.php:39
 * @route '/profile-village/edit'
 */
showOrCreate.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return showOrCreate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileVillageController::showOrCreate
 * @see app/Http/Controllers/ProfileVillageController.php:39
 * @route '/profile-village/edit'
 */
showOrCreate.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showOrCreate.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProfileVillageController::showOrCreate
 * @see app/Http/Controllers/ProfileVillageController.php:39
 * @route '/profile-village/edit'
 */
showOrCreate.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showOrCreate.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProfileVillageController::storeOrUpdate
 * @see app/Http/Controllers/ProfileVillageController.php:56
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
 * @see app/Http/Controllers/ProfileVillageController.php:56
 * @route '/profile-village'
 */
storeOrUpdate.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return storeOrUpdate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileVillageController::storeOrUpdate
 * @see app/Http/Controllers/ProfileVillageController.php:56
 * @route '/profile-village'
 */
storeOrUpdate.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storeOrUpdate.url(options),
    method: 'post',
})
const ProfileVillageController = { indexPublic, indexAdmin, showOrCreate, storeOrUpdate }

export default ProfileVillageController