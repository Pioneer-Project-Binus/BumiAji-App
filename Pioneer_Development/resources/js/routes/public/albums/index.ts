import { queryParams, type QueryParams } from './../../../wayfinder'

/**
* @see \App\Http\Controllers\AlbumController::index
 * @see app/Http/Controllers/AlbumController.php:15
 * @route '/album-galeri'
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
    url: '/album-galeri',
}

/**
* @see \App\Http\Controllers\AlbumController::index
 * @see app/Http/Controllers/AlbumController.php:15
 * @route '/album-galeri'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AlbumController::index
 * @see app/Http/Controllers/AlbumController.php:15
 * @route '/album-galeri'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AlbumController::index
 * @see app/Http/Controllers/AlbumController.php:15
 * @route '/album-galeri'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AlbumController::show
 * @see app/Http/Controllers/AlbumController.php:97
 * @route '/album-galeri/{slug}'
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
    url: '/album-galeri/{slug}',
}

/**
* @see \App\Http\Controllers\AlbumController::show
 * @see app/Http/Controllers/AlbumController.php:97
 * @route '/album-galeri/{slug}'
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
* @see \App\Http\Controllers\AlbumController::show
 * @see app/Http/Controllers/AlbumController.php:97
 * @route '/album-galeri/{slug}'
 */
show.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AlbumController::show
 * @see app/Http/Controllers/AlbumController.php:97
 * @route '/album-galeri/{slug}'
 */
show.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})
const albums = {
    index,
show,
}

export default albums