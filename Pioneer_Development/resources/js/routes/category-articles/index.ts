import { queryParams, type QueryParams } from './../../wayfinder'
/**
* @see \App\Http\Controllers\CategoryArticleController::index
 * @see app/Http/Controllers/CategoryArticleController.php:14
 * @route '/category-articles'
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
    url: '/category-articles',
}

/**
* @see \App\Http\Controllers\CategoryArticleController::index
 * @see app/Http/Controllers/CategoryArticleController.php:14
 * @route '/category-articles'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryArticleController::index
 * @see app/Http/Controllers/CategoryArticleController.php:14
 * @route '/category-articles'
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
 * @route '/category-articles'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CategoryArticleController::create
 * @see app/Http/Controllers/CategoryArticleController.php:54
 * @route '/category-articles/create'
 */
export const create = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '/category-articles/create',
}

/**
* @see \App\Http\Controllers\CategoryArticleController::create
 * @see app/Http/Controllers/CategoryArticleController.php:54
 * @route '/category-articles/create'
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryArticleController::create
 * @see app/Http/Controllers/CategoryArticleController.php:54
 * @route '/category-articles/create'
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CategoryArticleController::create
 * @see app/Http/Controllers/CategoryArticleController.php:54
 * @route '/category-articles/create'
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CategoryArticleController::store
 * @see app/Http/Controllers/CategoryArticleController.php:63
 * @route '/category-articles'
 */
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/category-articles',
}

/**
* @see \App\Http\Controllers\CategoryArticleController::store
 * @see app/Http/Controllers/CategoryArticleController.php:63
 * @route '/category-articles'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryArticleController::store
 * @see app/Http/Controllers/CategoryArticleController.php:63
 * @route '/category-articles'
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CategoryArticleController::edit
 * @see app/Http/Controllers/CategoryArticleController.php:125
 * @route '/category-articles/{slug}/edit'
 */
export const edit = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/category-articles/{slug}/edit',
}

/**
* @see \App\Http\Controllers\CategoryArticleController::edit
 * @see app/Http/Controllers/CategoryArticleController.php:125
 * @route '/category-articles/{slug}/edit'
 */
edit.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return edit.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryArticleController::edit
 * @see app/Http/Controllers/CategoryArticleController.php:125
 * @route '/category-articles/{slug}/edit'
 */
edit.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CategoryArticleController::edit
 * @see app/Http/Controllers/CategoryArticleController.php:125
 * @route '/category-articles/{slug}/edit'
 */
edit.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CategoryArticleController::update
 * @see app/Http/Controllers/CategoryArticleController.php:138
 * @route '/category-articles/{slug}'
 */
export const update = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put'],
    url: '/category-articles/{slug}',
}

/**
* @see \App\Http\Controllers\CategoryArticleController::update
 * @see app/Http/Controllers/CategoryArticleController.php:138
 * @route '/category-articles/{slug}'
 */
update.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryArticleController::update
 * @see app/Http/Controllers/CategoryArticleController.php:138
 * @route '/category-articles/{slug}'
 */
update.put = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CategoryArticleController::destroy
 * @see app/Http/Controllers/CategoryArticleController.php:178
 * @route '/category-articles/{slug}'
 */
export const destroy = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/category-articles/{slug}',
}

/**
* @see \App\Http\Controllers\CategoryArticleController::destroy
 * @see app/Http/Controllers/CategoryArticleController.php:178
 * @route '/category-articles/{slug}'
 */
destroy.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return destroy.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryArticleController::destroy
 * @see app/Http/Controllers/CategoryArticleController.php:178
 * @route '/category-articles/{slug}'
 */
destroy.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const categoryArticles = {
    index,
create,
store,
edit,
update,
destroy,
}

export default categoryArticles