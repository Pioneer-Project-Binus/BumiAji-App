import { queryParams, type QueryParams } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ArticleController::indexPublic
 * @see app/Http/Controllers/ArticleController.php:39
 * @route '/artikel'
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
    url: '/artikel',
}

/**
* @see \App\Http\Controllers\ArticleController::indexPublic
 * @see app/Http/Controllers/ArticleController.php:39
 * @route '/artikel'
 */
indexPublic.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexPublic.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::indexPublic
 * @see app/Http/Controllers/ArticleController.php:39
 * @route '/artikel'
 */
indexPublic.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexPublic.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ArticleController::indexPublic
 * @see app/Http/Controllers/ArticleController.php:39
 * @route '/artikel'
 */
indexPublic.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexPublic.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ArticleController::landing
 * @see app/Http/Controllers/ArticleController.php:17
 * @route '/artikel/landing'
 */
export const landing = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: landing.url(options),
    method: 'get',
})

landing.definition = {
    methods: ['get','head'],
    url: '/artikel/landing',
}

/**
* @see \App\Http\Controllers\ArticleController::landing
 * @see app/Http/Controllers/ArticleController.php:17
 * @route '/artikel/landing'
 */
landing.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return landing.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::landing
 * @see app/Http/Controllers/ArticleController.php:17
 * @route '/artikel/landing'
 */
landing.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: landing.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ArticleController::landing
 * @see app/Http/Controllers/ArticleController.php:17
 * @route '/artikel/landing'
 */
landing.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: landing.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ArticleController::show
 * @see app/Http/Controllers/ArticleController.php:202
 * @route '/artikel/{slug}'
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
    url: '/artikel/{slug}',
}

/**
* @see \App\Http\Controllers\ArticleController::show
 * @see app/Http/Controllers/ArticleController.php:202
 * @route '/artikel/{slug}'
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
* @see \App\Http\Controllers\ArticleController::show
 * @see app/Http/Controllers/ArticleController.php:202
 * @route '/artikel/{slug}'
 */
show.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ArticleController::show
 * @see app/Http/Controllers/ArticleController.php:202
 * @route '/artikel/{slug}'
 */
show.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})
const articles = {
    indexPublic,
landing,
show,
}

export default articles