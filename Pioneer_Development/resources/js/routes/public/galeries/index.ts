import { queryParams, type QueryParams } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\GaleryController::indexPublic
 * @see app/Http/Controllers/GaleryController.php:47
 * @route '/galeri'
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
    url: '/galeri',
}

/**
* @see \App\Http\Controllers\GaleryController::indexPublic
 * @see app/Http/Controllers/GaleryController.php:47
 * @route '/galeri'
 */
indexPublic.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexPublic.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GaleryController::indexPublic
 * @see app/Http/Controllers/GaleryController.php:47
 * @route '/galeri'
 */
indexPublic.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexPublic.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GaleryController::indexPublic
 * @see app/Http/Controllers/GaleryController.php:47
 * @route '/galeri'
 */
indexPublic.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexPublic.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\GaleryController::show
 * @see app/Http/Controllers/GaleryController.php:172
 * @route '/galeri/{slug}'
 */
export const show = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/galeri/{slug}',
}

/**
* @see \App\Http\Controllers\GaleryController::show
 * @see app/Http/Controllers/GaleryController.php:172
 * @route '/galeri/{slug}'
 */
show.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    const parsedArgs = {
                        slug: args.slug,
                }

    return show.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GaleryController::show
 * @see app/Http/Controllers/GaleryController.php:172
 * @route '/galeri/{slug}'
 */
show.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GaleryController::show
 * @see app/Http/Controllers/GaleryController.php:172
 * @route '/galeri/{slug}'
 */
show.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})
const galeries = {
    indexPublic,
show,
}

export default galeries