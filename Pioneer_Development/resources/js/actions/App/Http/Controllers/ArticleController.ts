import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\ArticleController::index
 * @see app\Http\Controllers\ArticleController.php:18
 * @route /artikel
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
    url: '\/artikel',
}

/**
 * @see \App\Http\Controllers\ArticleController::index
 * @see app\Http\Controllers\ArticleController.php:18
 * @route /artikel
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ArticleController::index
 * @see app\Http\Controllers\ArticleController.php:18
 * @route /artikel
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\ArticleController::index
 * @see app\Http\Controllers\ArticleController.php:18
 * @route /artikel
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\ArticleController::show
 * @see app\Http\Controllers\ArticleController.php:118
 * @route /artikel/{slug}
 */
export const show = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/artikel\/{slug}',
}

/**
 * @see \App\Http\Controllers\ArticleController::show
 * @see app\Http\Controllers\ArticleController.php:118
 * @route /artikel/{slug}
 */
show.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ArticleController::show
 * @see app\Http\Controllers\ArticleController.php:118
 * @route /artikel/{slug}
 */
show.get = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\ArticleController::show
 * @see app\Http\Controllers\ArticleController.php:118
 * @route /artikel/{slug}
 */
show.head = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\ArticleController::create
 * @see app\Http\Controllers\ArticleController.php:62
 * @route /admin/articles/create
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
    url: '\/admin\/articles\/create',
}

/**
 * @see \App\Http\Controllers\ArticleController::create
 * @see app\Http\Controllers\ArticleController.php:62
 * @route /admin/articles/create
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ArticleController::create
 * @see app\Http\Controllers\ArticleController.php:62
 * @route /admin/articles/create
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
 * @see app\Http\Controllers\ArticleController.php:62
 * @route /admin/articles/create
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
 * @see app\Http\Controllers\ArticleController.php:73
 * @route /admin/articles
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
    url: '\/admin\/articles',
}

/**
 * @see \App\Http\Controllers\ArticleController::store
 * @see app\Http\Controllers\ArticleController.php:73
 * @route /admin/articles
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ArticleController::store
 * @see app\Http\Controllers\ArticleController.php:73
 * @route /admin/articles
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


/**
 * @see \App\Http\Controllers\ArticleController::edit
 * @see app\Http\Controllers\ArticleController.php:130
 * @route /admin/articles/{slug}/edit
 */
export const edit = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/admin\/articles\/{slug}\/edit',
}

/**
 * @see \App\Http\Controllers\ArticleController::edit
 * @see app\Http\Controllers\ArticleController.php:130
 * @route /admin/articles/{slug}/edit
 */
edit.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ArticleController::edit
 * @see app\Http\Controllers\ArticleController.php:130
 * @route /admin/articles/{slug}/edit
 */
edit.get = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\ArticleController::edit
 * @see app\Http\Controllers\ArticleController.php:130
 * @route /admin/articles/{slug}/edit
 */
edit.head = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\ArticleController::updated2d1613cc53a61b9a6bb3d647faf88ce
 * @see app\Http\Controllers\ArticleController.php:143
 * @route /admin/articles/{slug}
 */
const updated2d1613cc53a61b9a6bb3d647faf88ce = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: updated2d1613cc53a61b9a6bb3d647faf88ce.url(args, options),
    method: 'put',
})

updated2d1613cc53a61b9a6bb3d647faf88ce.definition = {
    methods: ['put'],
    url: '\/admin\/articles\/{slug}',
}

/**
 * @see \App\Http\Controllers\ArticleController::updated2d1613cc53a61b9a6bb3d647faf88ce
 * @see app\Http\Controllers\ArticleController.php:143
 * @route /admin/articles/{slug}
 */
updated2d1613cc53a61b9a6bb3d647faf88ce.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return updated2d1613cc53a61b9a6bb3d647faf88ce.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ArticleController::updated2d1613cc53a61b9a6bb3d647faf88ce
 * @see app\Http\Controllers\ArticleController.php:143
 * @route /admin/articles/{slug}
 */
updated2d1613cc53a61b9a6bb3d647faf88ce.put = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: updated2d1613cc53a61b9a6bb3d647faf88ce.url(args, options),
    method: 'put',
})

/**
 * @see \App\Http\Controllers\ArticleController::update72bd9bc52af84fcac127a2d85d370e77
 * @see app\Http\Controllers\ArticleController.php:143
 * @route /admin/articles/{slug}/update
 */
const update72bd9bc52af84fcac127a2d85d370e77 = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update72bd9bc52af84fcac127a2d85d370e77.url(args, options),
    method: 'post',
})

update72bd9bc52af84fcac127a2d85d370e77.definition = {
    methods: ['post'],
    url: '\/admin\/articles\/{slug}\/update',
}

/**
 * @see \App\Http\Controllers\ArticleController::update72bd9bc52af84fcac127a2d85d370e77
 * @see app\Http\Controllers\ArticleController.php:143
 * @route /admin/articles/{slug}/update
 */
update72bd9bc52af84fcac127a2d85d370e77.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update72bd9bc52af84fcac127a2d85d370e77.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ArticleController::update72bd9bc52af84fcac127a2d85d370e77
 * @see app\Http\Controllers\ArticleController.php:143
 * @route /admin/articles/{slug}/update
 */
update72bd9bc52af84fcac127a2d85d370e77.post = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update72bd9bc52af84fcac127a2d85d370e77.url(args, options),
    method: 'post',
})

export const update = {
    '\/admin\/articles\/{slug}': updated2d1613cc53a61b9a6bb3d647faf88ce,
    '\/admin\/articles\/{slug}\/update': update72bd9bc52af84fcac127a2d85d370e77,
}


/**
 * @see \App\Http\Controllers\ArticleController::destroy
 * @see app\Http\Controllers\ArticleController.php:200
 * @route /admin/articles/{slug}
 */
export const destroy = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '\/admin\/articles\/{slug}',
}

/**
 * @see \App\Http\Controllers\ArticleController::destroy
 * @see app\Http\Controllers\ArticleController.php:200
 * @route /admin/articles/{slug}
 */
destroy.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ArticleController::destroy
 * @see app\Http\Controllers\ArticleController.php:200
 * @route /admin/articles/{slug}
 */
destroy.delete = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})


const ArticleController = { index, show, create, store, edit, update, destroy }

export default ArticleController