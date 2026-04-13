package com.codekick.app.ui.screens.mytopics;

import com.codekick.app.data.repository.LearningRepository;
import dagger.internal.DaggerGenerated;
import dagger.internal.Factory;
import dagger.internal.Provider;
import dagger.internal.QualifierMetadata;
import dagger.internal.ScopeMetadata;
import javax.annotation.processing.Generated;

@ScopeMetadata
@QualifierMetadata
@DaggerGenerated
@Generated(
    value = "dagger.internal.codegen.ComponentProcessor",
    comments = "https://dagger.dev"
)
@SuppressWarnings({
    "unchecked",
    "rawtypes",
    "KotlinInternal",
    "KotlinInternalInJava",
    "cast",
    "deprecation",
    "nullness:initialization.field.uninitialized"
})
public final class MyTopicsViewModel_Factory implements Factory<MyTopicsViewModel> {
  private final Provider<LearningRepository> repoProvider;

  public MyTopicsViewModel_Factory(Provider<LearningRepository> repoProvider) {
    this.repoProvider = repoProvider;
  }

  @Override
  public MyTopicsViewModel get() {
    return newInstance(repoProvider.get());
  }

  public static MyTopicsViewModel_Factory create(Provider<LearningRepository> repoProvider) {
    return new MyTopicsViewModel_Factory(repoProvider);
  }

  public static MyTopicsViewModel newInstance(LearningRepository repo) {
    return new MyTopicsViewModel(repo);
  }
}
