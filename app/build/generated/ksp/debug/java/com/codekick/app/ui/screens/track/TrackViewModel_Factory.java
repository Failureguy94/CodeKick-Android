package com.codekick.app.ui.screens.track;

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
public final class TrackViewModel_Factory implements Factory<TrackViewModel> {
  private final Provider<LearningRepository> learningRepositoryProvider;

  public TrackViewModel_Factory(Provider<LearningRepository> learningRepositoryProvider) {
    this.learningRepositoryProvider = learningRepositoryProvider;
  }

  @Override
  public TrackViewModel get() {
    return newInstance(learningRepositoryProvider.get());
  }

  public static TrackViewModel_Factory create(
      Provider<LearningRepository> learningRepositoryProvider) {
    return new TrackViewModel_Factory(learningRepositoryProvider);
  }

  public static TrackViewModel newInstance(LearningRepository learningRepository) {
    return new TrackViewModel(learningRepository);
  }
}
