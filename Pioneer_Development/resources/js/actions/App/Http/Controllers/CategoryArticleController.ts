import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CategoryArticleController::indexPublic
 * @see app/Http/Controllers/CategoryArticleController.php:14
 * @route '/kategori-artikel'
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
    url: '/kategori-artikel',
}

/**
* @see \App\Http\Controllers\CategoryArticleController::indexPublic
 * @see app/Http/Controllers/CategoryArticleController.php:14
 * @route '/kategori-artikel'
 */
indexPublic.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexPublic.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryArticleController::indexPublic
 * @see app/Http/Controllers/CategoryArticleController.php:14
 * @route '/kategori-artikel'
 */
indexPublic.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexPublic.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CategoryArticleController::indexPublic
 * @see app/Http/Controllers/CategoryArticleController.php:14
 * @route '/kategori-artikel'
 */
indexPublic.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexPublic.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CategoryArticleController::showPublic
 * @see app/Http/Controllers/CategoryArticleController.php:118
 * @route '/kategori-artikel/{slug}'
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
    url: '/kategori-artikel/{slug}',
}

/**
* @see \App\Http\Controllers\CategoryArticleController::showPublic
 * @see app/Http/Controllers/CategoryArticleController.php:118
 * @route '/kategori-artikel/{slug}'
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
* @see \App\Http\Controllers\CategoryArticleController::showPublic
 * @see app/Http/Controllers/CategoryArticleController.php:118
 * @route '/kategori-artikel/{slug}'
 */
showPublic.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showPublic.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CategoryArticleController::showPublic
 * @see app/Http/Controllers/CategoryArticleController.php:118
 * @route '/kategori-artikel/{slug}'
 */
showPublic.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showPublic.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CategoryArticleController::indexAdmin
 * @see app/Http/Controllers/CategoryArticleController.php:44
 * @route '/category-articles'
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
    url: '/category-articles',
}

/**
* @see \App\Http\Controllers\CategoryArticleController::indexAdmin
 * @see app/Http/Controllers/CategoryArticleController.php:44
 * @route '/category-articles'
 */
indexAdmin.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexAdmin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryArticleController::indexAdmin
 * @see app/Http/Controllers/CategoryArticleController.php:44
 * @route '/category-articles'
 */
indexAdmin.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexAdmin.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CategoryArticleController::indexAdmin
 * @see app/Http/Controllers/CategoryArticleController.php:44
 * @route '/category-articles'
 */
indexAdmin.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexAdmin.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CategoryArticleController::archivedIndex
 * @see app/Http/Controllers/CategoryArticleController.php:227
 * @route '/category-articles/archived'
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
    url: '/category-articles/archived',
}

/**
* @see \App\Http\Controllers\CategoryArticleController::archivedIndex
 * @see app/Http/Controllers/CategoryArticleController.php:227
 * @route '/category-articles/archived'
 */
archivedIndex.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return archivedIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryArticleController::archivedIndex
 * @see app/Http/Controllers/CategoryArticleController.php:227
 * @route '/category-articles/archived'
 */
archivedIndex.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: archivedIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CategoryArticleController::archivedIndex
 * @see app/Http/Controllers/CategoryArticleController.php:227
 * @route '/category-articles/archived'
 */
archivedIndex.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: archivedIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CategoryArticleController::create
 * @see app/Http/Controllers/CategoryArticleController.php:74
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
 * @see app/Http/Controllers/CategoryArticleController.php:74
 * @route '/category-articles/create'
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryArticleController::create
 * @see app/Http/Controllers/CategoryArticleController.php:74
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
 * @see app/Http/Controllers/CategoryArticleController.php:74
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
 * @see app/Http/Controllers/CategoryArticleController.php:83
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
 * @see app/Http/Controllers/CategoryArticleController.php:83
 * @route '/category-articles'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryArticleController::store
 * @see app/Http/Controllers/CategoryArticleController.php:83
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
* @see \App\Http\Controllers\CategoryArticleController::showAdmin
 * @see app/Http/Controllers/CategoryArticleController.php:138
 * @route '/category-articles/{slug}'
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
    url: '/category-articles/{slug}',
}

/**
* @see \App\Http\Controllers\CategoryArticleController::showAdmin
 * @see app/Http/Controllers/CategoryArticleController.php:138
 * @route '/category-articles/{slug}'
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
* @see \App\Http\Controllers\CategoryArticleController::showAdmin
 * @see app/Http/Controllers/CategoryArticleController.php:138
 * @route '/category-articles/{slug}'
 */
showAdmin.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showAdmin.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CategoryArticleController::showAdmin
 * @see app/Http/Controllers/CategoryArticleController.php:138
 * @route '/category-articles/{slug}'
 */
showAdmin.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showAdmin.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CategoryArticleController::edit
 * @see app/Http/Controllers/CategoryArticleController.php:159
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
 * @see app/Http/Controllers/CategoryArticleController.php:159
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
 * @see app/Http/Controllers/CategoryArticleController.php:159
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
 * @see app/Http/Controllers/CategoryArticleController.php:159
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
 * @see app/Http/Controllers/CategoryArticleController.php:170
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
 * @see app/Http/Controllers/CategoryArticleController.php:170
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
 * @see app/Http/Controllers/CategoryArticleController.php:170
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
 * @see app/Http/Controllers/CategoryArticleController.php:210
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
 * @see app/Http/Controllers/CategoryArticleController.php:210
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
 * @see app/Http/Controllers/CategoryArticleController.php:210
 * @route '/category-articles/{slug}'
 */
destroy.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CategoryArticleController::restore
 * @see app/Http/Controllers/CategoryArticleController.php:256
 * @route '/category-articles/{slug}/restore'
 */
export const restore = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: restore.url(args, options),
    method: 'put',
})

restore.definition = {
    methods: ['put'],
    url: '/category-articles/{slug}/restore',
}

/**
* @see \App\Http\Controllers\CategoryArticleController::restore
 * @see app/Http/Controllers/CategoryArticleController.php:256
 * @route '/category-articles/{slug}/restore'
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
* @see \App\Http\Controllers\CategoryArticleController::restore
 * @see app/Http/Controllers/CategoryArticleController.php:256
 * @route '/category-articles/{slug}/restore'
 */
restore.put = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: restore.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CategoryArticleController::deletePermanent
 * @see app/Http/Controllers/CategoryArticleController.php:276
 * @route '/category-articles/{slug}/delete-permanent'
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
    url: '/category-articles/{slug}/delete-permanent',
}

/**
* @see \App\Http\Controllers\CategoryArticleController::deletePermanent
 * @see app/Http/Controllers/CategoryArticleController.php:276
 * @route '/category-articles/{slug}/delete-permanent'
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
* @see \App\Http\Controllers\CategoryArticleController::deletePermanent
 * @see app/Http/Controllers/CategoryArticleController.php:276
 * @route '/category-articles/{slug}/delete-permanent'
 */
deletePermanent.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: deletePermanent.url(args, options),
    method: 'delete',
})
const CategoryArticleController = { indexPublic, showPublic, indexAdmin, archivedIndex, create, store, showAdmin, edit, update, destroy, restore, deletePermanent }

export default CategoryArticleController