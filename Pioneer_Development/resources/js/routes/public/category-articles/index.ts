import { queryParams, type QueryParams } from './../../../wayfinder'

/**
* @see \App\Http\Controllers\CategoryArticleController::index
 * @see app/Http/Controllers/CategoryArticleController.php:14
 * @route '/kategori-artikel'
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
    url: '/kategori-artikel',
}

/**
* @see \App\Http\Controllers\CategoryArticleController::index
 * @see app/Http/Controllers/CategoryArticleController.php:14
 * @route '/kategori-artikel'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryArticleController::index
 * @see app/Http/Controllers/CategoryArticleController.php:14
 * @route '/kategori-artikel'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CategoryArticleController::index
 * @see app/Http/Controllers/CategoryArticleController.php:14
 * @route '/kategori-artikel'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CategoryArticleController::show
 * @see app/Http/Controllers/CategoryArticleController.php:89
 * @route '/kategori-artikel/{slug}'
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
    url: '/kategori-artikel/{slug}',
}

/**
* @see \App\Http\Controllers\CategoryArticleController::show
 * @see app/Http/Controllers/CategoryArticleController.php:89
 * @route '/kategori-artikel/{slug}'
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
* @see \App\Http\Controllers\CategoryArticleController::show
 * @see app/Http/Controllers/CategoryArticleController.php:89
 * @route '/kategori-artikel/{slug}'
 */
show.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CategoryArticleController::show
 * @see app/Http/Controllers/CategoryArticleController.php:89
 * @route '/kategori-artikel/{slug}'
 */
show.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})
const categoryArticles = {
    index,
show,
}

export default categoryArticles