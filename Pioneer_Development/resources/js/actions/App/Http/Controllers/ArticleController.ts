import { queryParams, type QueryParams } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\ArticleController::showPublic
 * @see app/Http/Controllers/ArticleController.php:175
 * @route '/artikel/{slug}'
 */
export const showPublic = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showPublic.url(args, options),
    method: 'get',
})

showPublic.definition = {
    methods: ['get','head'],
    url: '/artikel/{slug}',
}

/**
* @see \App\Http\Controllers\ArticleController::showPublic
 * @see app/Http/Controllers/ArticleController.php:175
 * @route '/artikel/{slug}'
 */
showPublic.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return showPublic.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::showPublic
 * @see app/Http/Controllers/ArticleController.php:175
 * @route '/artikel/{slug}'
 */
showPublic.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showPublic.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ArticleController::showPublic
 * @see app/Http/Controllers/ArticleController.php:175
 * @route '/artikel/{slug}'
 */
showPublic.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showPublic.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ArticleController::indexAdmin
 * @see app/Http/Controllers/ArticleController.php:125
 * @route '/articles'
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
    url: '/articles',
}

/**
* @see \App\Http\Controllers\ArticleController::indexAdmin
 * @see app/Http/Controllers/ArticleController.php:125
 * @route '/articles'
 */
indexAdmin.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexAdmin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::indexAdmin
 * @see app/Http/Controllers/ArticleController.php:125
 * @route '/articles'
 */
indexAdmin.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexAdmin.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ArticleController::indexAdmin
 * @see app/Http/Controllers/ArticleController.php:125
 * @route '/articles'
 */
indexAdmin.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexAdmin.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ArticleController::create
 * @see app/Http/Controllers/ArticleController.php:209
 * @route '/articles/create'
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
    url: '/articles/create',
}

/**
* @see \App\Http\Controllers\ArticleController::create
 * @see app/Http/Controllers/ArticleController.php:209
 * @route '/articles/create'
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::create
 * @see app/Http/Controllers/ArticleController.php:209
 * @route '/articles/create'
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ArticleController::create
 * @see app/Http/Controllers/ArticleController.php:209
 * @route '/articles/create'
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ArticleController::store
 * @see app/Http/Controllers/ArticleController.php:219
 * @route '/articles'
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
    url: '/articles',
}

/**
* @see \App\Http\Controllers\ArticleController::store
 * @see app/Http/Controllers/ArticleController.php:219
 * @route '/articles'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::store
 * @see app/Http/Controllers/ArticleController.php:219
 * @route '/articles'
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ArticleController::archivedIndex
 * @see app/Http/Controllers/ArticleController.php:353
 * @route '/articles/archived'
 */
export const archivedIndex = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: archivedIndex.url(options),
    method: 'get',
})

archivedIndex.definition = {
    methods: ['get','head'],
    url: '/articles/archived',
}

/**
* @see \App\Http\Controllers\ArticleController::archivedIndex
 * @see app/Http/Controllers/ArticleController.php:353
 * @route '/articles/archived'
 */
archivedIndex.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return archivedIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::archivedIndex
 * @see app/Http/Controllers/ArticleController.php:353
 * @route '/articles/archived'
 */
archivedIndex.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: archivedIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ArticleController::archivedIndex
 * @see app/Http/Controllers/ArticleController.php:353
 * @route '/articles/archived'
 */
archivedIndex.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: archivedIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ArticleController::showAdmin
 * @see app/Http/Controllers/ArticleController.php:194
 * @route '/articles/{slug}'
 */
export const showAdmin = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showAdmin.url(args, options),
    method: 'get',
})

showAdmin.definition = {
    methods: ['get','head'],
    url: '/articles/{slug}',
}

/**
* @see \App\Http\Controllers\ArticleController::showAdmin
 * @see app/Http/Controllers/ArticleController.php:194
 * @route '/articles/{slug}'
 */
showAdmin.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return showAdmin.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::showAdmin
 * @see app/Http/Controllers/ArticleController.php:194
 * @route '/articles/{slug}'
 */
showAdmin.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showAdmin.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ArticleController::showAdmin
 * @see app/Http/Controllers/ArticleController.php:194
 * @route '/articles/{slug}'
 */
showAdmin.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showAdmin.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ArticleController::edit
 * @see app/Http/Controllers/ArticleController.php:262
 * @route '/articles/{slug}/edit'
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
    url: '/articles/{slug}/edit',
}

/**
* @see \App\Http\Controllers\ArticleController::edit
 * @see app/Http/Controllers/ArticleController.php:262
 * @route '/articles/{slug}/edit'
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
* @see \App\Http\Controllers\ArticleController::edit
 * @see app/Http/Controllers/ArticleController.php:262
 * @route '/articles/{slug}/edit'
 */
edit.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ArticleController::edit
 * @see app/Http/Controllers/ArticleController.php:262
 * @route '/articles/{slug}/edit'
 */
edit.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ArticleController::update
 * @see app/Http/Controllers/ArticleController.php:278
 * @route '/articles/{slug}'
 */
const update86fec96e7cf877c1b0bd578f6a396d90 = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update86fec96e7cf877c1b0bd578f6a396d90.url(args, options),
    method: 'put',
})

update86fec96e7cf877c1b0bd578f6a396d90.definition = {
    methods: ['put'],
    url: '/articles/{slug}',
}

/**
* @see \App\Http\Controllers\ArticleController::update
 * @see app/Http/Controllers/ArticleController.php:278
 * @route '/articles/{slug}'
 */
update86fec96e7cf877c1b0bd578f6a396d90.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update86fec96e7cf877c1b0bd578f6a396d90.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::update
 * @see app/Http/Controllers/ArticleController.php:278
 * @route '/articles/{slug}'
 */
update86fec96e7cf877c1b0bd578f6a396d90.put = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update86fec96e7cf877c1b0bd578f6a396d90.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ArticleController::update
 * @see app/Http/Controllers/ArticleController.php:278
 * @route '/articles/{slug}/update'
 */
const updatefb3e211aaeffad621cbf940d1b3375c6 = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: updatefb3e211aaeffad621cbf940d1b3375c6.url(args, options),
    method: 'post',
})

updatefb3e211aaeffad621cbf940d1b3375c6.definition = {
    methods: ['post'],
    url: '/articles/{slug}/update',
}

/**
* @see \App\Http\Controllers\ArticleController::update
 * @see app/Http/Controllers/ArticleController.php:278
 * @route '/articles/{slug}/update'
 */
updatefb3e211aaeffad621cbf940d1b3375c6.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return updatefb3e211aaeffad621cbf940d1b3375c6.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::update
 * @see app/Http/Controllers/ArticleController.php:278
 * @route '/articles/{slug}/update'
 */
updatefb3e211aaeffad621cbf940d1b3375c6.post = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: updatefb3e211aaeffad621cbf940d1b3375c6.url(args, options),
    method: 'post',
})

export const update = {
    '/articles/{slug}': update86fec96e7cf877c1b0bd578f6a396d90,
    '/articles/{slug}/update': updatefb3e211aaeffad621cbf940d1b3375c6,
}

/**
* @see \App\Http\Controllers\ArticleController::destroy
 * @see app/Http/Controllers/ArticleController.php:336
 * @route '/articles/{slug}'
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
    url: '/articles/{slug}',
}

/**
* @see \App\Http\Controllers\ArticleController::destroy
 * @see app/Http/Controllers/ArticleController.php:336
 * @route '/articles/{slug}'
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
* @see \App\Http\Controllers\ArticleController::destroy
 * @see app/Http/Controllers/ArticleController.php:336
 * @route '/articles/{slug}'
 */
destroy.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ArticleController::restore
 * @see app/Http/Controllers/ArticleController.php:385
 * @route '/articles/{slug}/restore'
 */
export const restore = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: restore.url(args, options),
    method: 'post',
})

restore.definition = {
    methods: ['post'],
    url: '/articles/{slug}/restore',
}

/**
* @see \App\Http\Controllers\ArticleController::restore
 * @see app/Http/Controllers/ArticleController.php:385
 * @route '/articles/{slug}/restore'
 */
restore.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return restore.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::restore
 * @see app/Http/Controllers/ArticleController.php:385
 * @route '/articles/{slug}/restore'
 */
restore.post = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: restore.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ArticleController::deletePermanent
 * @see app/Http/Controllers/ArticleController.php:402
 * @route '/articles/{slug}/permanent-delete'
 */
export const deletePermanent = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: deletePermanent.url(args, options),
    method: 'delete',
})

deletePermanent.definition = {
    methods: ['delete'],
    url: '/articles/{slug}/permanent-delete',
}

/**
* @see \App\Http\Controllers\ArticleController::deletePermanent
 * @see app/Http/Controllers/ArticleController.php:402
 * @route '/articles/{slug}/permanent-delete'
 */
deletePermanent.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return deletePermanent.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ArticleController::deletePermanent
 * @see app/Http/Controllers/ArticleController.php:402
 * @route '/articles/{slug}/permanent-delete'
 */
deletePermanent.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: deletePermanent.url(args, options),
    method: 'delete',
})
const ArticleController = { landing, indexPublic, showPublic, indexAdmin, create, store, archivedIndex, showAdmin, edit, update, destroy, restore, deletePermanent }

export default ArticleController